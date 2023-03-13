using Microsoft.Data.SqlClient;
using RchidatWebApplicationBackEndSide.Utilities;

namespace RchidatWebApplicationBackEndSide.Models.Connection
{
    public class DBConnection
    {
        public static string StrConn = "Data Source=DESKTOP-GKI6680\\SQLEXPRESS01;Initial Catalog=Rchidat;Integrated Security=True;Trust Server Certificate=true";
        public static SqlConnection GetConnection()
        {
            try
            {
                return new SqlConnection(StrConn);
            }
            catch(Exception e)
            {
                throw new MyException(e,"DataBase connection error",e.Message,"Connection");
            }
        }
    }
}
