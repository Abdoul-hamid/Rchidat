using Microsoft.Data.SqlClient;
using RchidatWebApplicationBackEndSide.Models.Connection;
using RchidatWebApplicationBackEndSide.Models.Entities;
using RchidatWebApplicationBackEndSide.Utilities;
using System.Data;

namespace RchidatWebApplicationBackEndSide.Models.DAL
{
    public class DAL_UserComment

    {

        public static int Add(UserComment userComment)

        {

            using (SqlConnection connection = DBConnection.GetConnection())

            {



                string StrSQL = "Insert Into [UserComment] (IDUser,Description,Star,CommentDate,State) output INSERTED.IDComment Values (@IDUser,@Description,@Star, @CommentDate,@State)";

                SqlCommand command = new SqlCommand(StrSQL, connection);

                command.Parameters.AddWithValue("@IDUser", userComment.IDUser);

                command.Parameters.AddWithValue("@Description", userComment.Description);

                command.Parameters.AddWithValue("@Star", userComment.Star);

                command.Parameters.AddWithValue("@CommentDate", userComment.CommentDate);
                command.Parameters.AddWithValue("@State", userComment.State);



                return Convert.ToInt32(DataBaseAccessUtilities.ScalarRequest(command));

            }

        }

        public static void Update(int id, UserComment userComment)

        {

            using (SqlConnection con = DBConnection.GetConnection())

            {



                string StrSQL = "UPDATE [UserComment] SET Description = @Description, Star = @Star, CommentDate = @CommentDate, State=@State WHERE IDComment = @EntityKey";

                SqlCommand command = new SqlCommand(StrSQL, con);

                command.Parameters.AddWithValue("@EntityKey", id);

                command.Parameters.AddWithValue("@Description", userComment.Description);

                command.Parameters.AddWithValue("@Star", userComment.Star);

                command.Parameters.AddWithValue("@CommentDate", userComment.CommentDate);
                command.Parameters.AddWithValue("@State", userComment.State);



                DataBaseAccessUtilities.NonQueryRequest(command);

            }

        }

        public static void Delete(int EntityKey)

        {

            using (SqlConnection con = DBConnection.GetConnection())

            {

                string StrSQL = "DELETE FROM [UserComment] WHERE IDComment=@EntityKey";

                SqlCommand command = new SqlCommand(StrSQL, con);

                command.Parameters.AddWithValue("@EntityKey", EntityKey);

                DataBaseAccessUtilities.NonQueryRequest(command);

            }

        }

        private static UserComment GetEntityFromDataRow(DataRow dataRow)

        {

            UserComment userComment = new UserComment();

            userComment.IDComment = Convert.ToInt32(dataRow["IDComment"]);

            userComment.IDUser = Convert.ToInt32(dataRow["IDUser"]);

            userComment.Description = dataRow["Description"].ToString();

            userComment.Star = Convert.ToInt32(dataRow["Star"]);

            userComment.CommentDate = (DateTime)dataRow["CommentDate"];
            userComment.State = Convert.ToBoolean(dataRow["State"]);



            return userComment;

        }

        private static List<UserComment> GetListFromDataTable(DataTable dt)

        {

            List<UserComment> list = new List<UserComment>();

            if (dt != null)

            {

                foreach (DataRow dr in dt.Rows)

                    list.Add(GetEntityFromDataRow(dr));

            }

            return list;

        }



        public static UserComment SelectById(int EntityKey)

        {

            using (SqlConnection con = DBConnection.GetConnection())

            {

                con.Open();

                string StrSQL = "SELECT * FROM [UserComment] WHERE IDComment = @EntityKey";

                SqlCommand command = new SqlCommand(StrSQL, con);

                command.Parameters.AddWithValue("@EntityKey", EntityKey);

                DataTable dt = DataBaseAccessUtilities.SelectRequest(command);

                if (dt != null && dt.Rows.Count != 0)

                    return GetEntityFromDataRow(dt.Rows[0]);

                else

                    return null;

            }

        }

        public static List<UserComment> SelectAll()

        {

            DataTable dataTable;

            using (SqlConnection con = DBConnection.GetConnection())

            {

                con.Open();

                string StrSQL = "SELECT * FROM [UserComment]";

                SqlCommand command = new SqlCommand(StrSQL, con);

                dataTable = DataBaseAccessUtilities.SelectRequest(command);

            }

            return GetListFromDataTable(dataTable);

        }

    }
}
