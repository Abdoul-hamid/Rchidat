using Microsoft.Data.SqlClient;
using RchidatWebApplicationBackEndSide.Models.Connection;
using RchidatWebApplicationBackEndSide.Models.Entities;
using RchidatWebApplicationBackEndSide.Utilities;
using System.Data;

namespace RchidatWebApplicationBackEndSide.Models.DAL
{
    public class DAL_CommandLine
    {
        public static void Add(CommandLine commandLine)
        {
            using (SqlConnection connection = DBConnection.GetConnection())
            {
                string StrSQL = "Insert Into [CommandLine](IDCommand,IDArticle,Quantity) Values (@IDCommand, @IDArticle, @Quantity)";
                SqlCommand command = new SqlCommand(StrSQL, connection);
                command.Parameters.AddWithValue("@IDCommand", commandLine.IDCommand);
                command.Parameters.AddWithValue("@IDArticle", commandLine.IDArticle);
                command.Parameters.AddWithValue("@Quantity", commandLine.Quantity);
                DataBaseAccessUtilities.NonQueryRequest(command);
            }
        }
        public static void Update(int id1,int id2,CommandLine commandLine)
        {
            using (SqlConnection con = DBConnection.GetConnection())
            {
                string StrSQL = "UPDATE [CommandLine] SET Quantity=@Quantity WHERE (IDCommand =@EntityKey1 AND IDArticle = @EntityKey2)";
                SqlCommand command = new SqlCommand(StrSQL, con);
                command.Parameters.AddWithValue("@EntityKey1", id1);
                command.Parameters.AddWithValue("@EntityKey2", id2);
                command.Parameters.AddWithValue("@Quantity", commandLine.Quantity);
                DataBaseAccessUtilities.NonQueryRequest(command);
            }
        }
        public static void Delete(int idCommand, int idArticle)
        {
            using (SqlConnection con = DBConnection.GetConnection())
            {
                string StrSQL = "DELETE FROM [CommandLine] WHERE (IDCommand =@EntityKey1 AND IDArticle = @EntityKey2)";
                SqlCommand command = new SqlCommand(StrSQL, con);
                command.Parameters.AddWithValue("@EntityKey1", idCommand);
                command.Parameters.AddWithValue("@EntityKey2", idArticle);
                DataBaseAccessUtilities.NonQueryRequest(command);
            }
        }
        private static CommandLine GetEntityFromDataRow(DataRow dataRow)
        {
            //Name,[Designation],[Description],Price,ImageArticle,MinStock,MaxStock,Quantity,ExpireDate,ReductionRate,LastPrice
            CommandLine commandLine = new CommandLine();
            commandLine.IDCommand = Convert.ToInt32(dataRow["IDCommand"]);
            commandLine.IDArticle = Convert.ToInt32(dataRow["IDArticle"]);
            commandLine.Quantity = Convert.ToInt32(dataRow["Quantity"]);
            return commandLine;
        }
        private static List<CommandLine> GetListFromDataTable(DataTable dt)
        {
            List<CommandLine> list = new List<CommandLine>();
            if (dt != null)
            {
                foreach (DataRow dr in dt.Rows)
                    list.Add(GetEntityFromDataRow(dr));
            }
            return list;
        }

        public static CommandLine SelectById(int idCommand, int idArticle)
        {
            using (SqlConnection con = DBConnection.GetConnection())
            {
                con.Open();
                string StrSQL = "SELECT * FROM [CommandLine] WHERE (IDCommand =@EntityKey1 AND IDArticle = @EntityKey2)";
                SqlCommand command = new SqlCommand(StrSQL, con);
                command.Parameters.AddWithValue("@EntityKey1", idCommand);
                command.Parameters.AddWithValue("@EntityKey2", idArticle);
                DataTable dt = DataBaseAccessUtilities.SelectRequest(command);
                if (dt != null && dt.Rows.Count != 0)
                    return GetEntityFromDataRow(dt.Rows[0]);
                else
                    return null;
            }
        }
        public static List<CommandLine> SelectAll()
        {
            DataTable dataTable;
            using (SqlConnection con = DBConnection.GetConnection())
            {
                con.Open();
                string StrSQL = "SELECT * FROM [CommandLine]";
                SqlCommand command = new SqlCommand(StrSQL, con);
                dataTable = DataBaseAccessUtilities.SelectRequest(command);
            }
            return GetListFromDataTable(dataTable);
        }
    }
}
