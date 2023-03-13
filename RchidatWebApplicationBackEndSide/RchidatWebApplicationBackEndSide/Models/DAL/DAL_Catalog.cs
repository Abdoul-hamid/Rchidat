using Microsoft.Data.SqlClient;
using RchidatWebApplicationBackEndSide.Models.Connection;
using RchidatWebApplicationBackEndSide.Models.Entities;
using RchidatWebApplicationBackEndSide.Utilities;
using System.Data;

namespace RchidatWebApplicationBackEndSide.Models.DAL
{
    public class DAL_Catalog
    {
        public static int Add(Catalog catalog)
        {
            using (SqlConnection connection = DBConnection.GetConnection())
            {
                string StrSQL = "Insert Into [Catalog] (Name,State) output INSERTED.IDCatalog Values (@Name,@State)";
                SqlCommand command = new SqlCommand(StrSQL, connection);
                command.Parameters.AddWithValue("@Name", catalog.Name);
                command.Parameters.AddWithValue("@State", catalog.State);
                return Convert.ToInt32(DataBaseAccessUtilities.ScalarRequest(command));
            }
        }
        public static void Update(int id, Catalog catalog)
        {
            using (SqlConnection con = DBConnection.GetConnection())
            {
                string StrSQL = "UPDATE [Catalog] SET [Name] = @Name, State=@State WHERE IDCatalog = @id";
                SqlCommand command = new SqlCommand(StrSQL, con);
                command.Parameters.AddWithValue("@id", id);
                command.Parameters.AddWithValue("@Name", catalog.Name);
                command.Parameters.AddWithValue("@State", catalog.State);
                DataBaseAccessUtilities.NonQueryRequest(command);
            }
        }
        public static void Delete(int id)
        {
            using (SqlConnection con = DBConnection.GetConnection())

            {
                string StrSQL = "DELETE FROM [Catalog] WHERE IDCatalog=@id";
                SqlCommand command = new SqlCommand(StrSQL, con);
                command.Parameters.AddWithValue("@id", id);
                DataBaseAccessUtilities.NonQueryRequest(command);
            }
        }
        private static Catalog GetEntityFromDataRow(DataRow dataRow)
        {
            Catalog catalog = new Catalog();
            catalog.IDCatalog = Convert.ToInt32(dataRow["IDCatalog"]);
            catalog.Name = dataRow["Name"].ToString();
            catalog.State = Convert.ToBoolean(dataRow["State"]);
            return catalog;

        }
        private static List<Catalog> GetListFromDataTable(DataTable dt)

        {

            List<Catalog> list = new List<Catalog>();

            if (dt != null)

            {

                foreach (DataRow dr in dt.Rows)

                    list.Add(GetEntityFromDataRow(dr));

            }

            return list;

        }



        public static Catalog SelectById(int id)

        {

            using (SqlConnection con = DBConnection.GetConnection())

            {

                con.Open();

                string StrSQL = "SELECT * FROM [Catalog] WHERE IDCatalog = @id";

                SqlCommand command = new SqlCommand(StrSQL, con);

                command.Parameters.AddWithValue("@id", id);

                DataTable dt = DataBaseAccessUtilities.SelectRequest(command);

                if (dt != null && dt.Rows.Count != 0)

                    return GetEntityFromDataRow(dt.Rows[0]);

                else

                    return null;

            }

        }

        public static int CheckNameExists(string name)

        {

            using (SqlConnection con = DBConnection.GetConnection())

            {

                string StrSQL = "SELECT COUNT(*) FROM [Catalog] WHERE Name = @Name";

                SqlCommand command = new SqlCommand(StrSQL, con);

                command.Parameters.AddWithValue("@Name", name);

                return Convert.ToInt32(DataBaseAccessUtilities.ScalarRequest(command));

            }

        }

        public static List<Catalog> SelectAll()

        {

            DataTable dataTable;

            using (SqlConnection con = DBConnection.GetConnection())

            {

                con.Open();

                string StrSQL = "SELECT * FROM [Catalog]";

                SqlCommand command = new SqlCommand(StrSQL, con);

                dataTable = DataBaseAccessUtilities.SelectRequest(command);

            }

            return GetListFromDataTable(dataTable);

        }

    }
}
