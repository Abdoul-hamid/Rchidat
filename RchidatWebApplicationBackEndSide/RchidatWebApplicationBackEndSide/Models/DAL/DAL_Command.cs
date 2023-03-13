using Microsoft.Data.SqlClient;
using RchidatWebApplicationBackEndSide.Models.Connection;
using RchidatWebApplicationBackEndSide.Models.Entities;
using RchidatWebApplicationBackEndSide.Utilities;
using System.Data;

namespace RchidatWebApplicationBackEndSide.Models.DAL
{
    public class DAL_Command

    {



        public static int Add(Command commd)

        {

            using (SqlConnection connection = DBConnection.GetConnection())

            {

                string StrSQL = "Insert Into [Command] (IDUser, CommandDate,State) output INSERTED.IDCommand Values (@IDUser,@CommandDate,@State)";

                SqlCommand command = new SqlCommand(StrSQL, connection);

                command.Parameters.AddWithValue("@IDUser", commd.IDUser);

                command.Parameters.AddWithValue("@CommandDate", commd.CommandDate);
                command.Parameters.AddWithValue("@State", commd.State);


                return Convert.ToInt32(DataBaseAccessUtilities.ScalarRequest(command));

            }

        }

        public static void Delete(int EntityKey)

        {

            using (SqlConnection con = DBConnection.GetConnection())

            {

                string StrSQL = "DELETE FROM [Command] WHERE IDCommand=@EntityKey";

                SqlCommand command = new SqlCommand(StrSQL, con);

                command.Parameters.AddWithValue("@EntityKey", EntityKey);

                DataBaseAccessUtilities.NonQueryRequest(command);

            }

        }

        private static Command GetEntityFromDataRow(DataRow dataRow)

        {



            Command command = new Command();

            command.IDCommand = Convert.ToInt32(dataRow["IDCommand"]);

            command.IDUser = Convert.ToInt32(dataRow["IDUser"]);

            command.CommandDate = (DateTime)dataRow["CommandDate"];

            command.State = Convert.ToString(dataRow["State"]);

            return command;

        }

        private static List<Command> GetListFromDataTable(DataTable dt)

        {

            List<Command> list = new List<Command>();

            if (dt != null)

            {

                foreach (DataRow dr in dt.Rows)

                    list.Add(GetEntityFromDataRow(dr));

            }

            return list;

        }



        public static Command SelectById(int EntityKey)

        {

            using (SqlConnection con = DBConnection.GetConnection())

            {

                con.Open();

                string StrSQL = "SELECT * FROM [Command] WHERE IDCommand = @EntityKey";

                SqlCommand command = new SqlCommand(StrSQL, con);

                command.Parameters.AddWithValue("@EntityKey", EntityKey);

                DataTable dt = DataBaseAccessUtilities.SelectRequest(command);

                if (dt != null && dt.Rows.Count != 0)

                    return GetEntityFromDataRow(dt.Rows[0]);

                else

                    return null;

            }

        }



        public static List<Command> SelectAll()

        {

            DataTable dataTable;

            using (SqlConnection con = DBConnection.GetConnection())

            {

                con.Open();

                string StrSQL = "SELECT * FROM [Command]";

                SqlCommand command = new SqlCommand(StrSQL, con);

                dataTable = DataBaseAccessUtilities.SelectRequest(command);

            }

            return GetListFromDataTable(dataTable);

        }

    }


}
