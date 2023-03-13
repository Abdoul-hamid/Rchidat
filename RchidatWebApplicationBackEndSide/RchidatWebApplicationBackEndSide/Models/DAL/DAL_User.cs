using Microsoft.Data.SqlClient;
using RchidatWebApplicationBackEndSide.Models.Connection;
using RchidatWebApplicationBackEndSide.Models.Entities;
using RchidatWebApplicationBackEndSide.Utilities;
using System.Data;

namespace RchidatWebApplicationBackEndSide.Models.DAL
{
    public class DAL_User
    {
        public static int Add(User user)
        {
            using (SqlConnection connection = DBConnection.GetConnection())
            {
                string StrSQL = "Insert Into [User](FirstName,LastName,Email,[Password],Phone,Gender,City,Country,ImageUser,CreatedAt,ModifiedAt,FullAddress,[Role],State,Status) output INSERTED.IDUser Values (@FirstName, @LastName, @Email, @Password, @Phone, @Gender, @City, @Country, @ImageUser, @CreatedAt, @ModifiedAt, @FullAddress, @Role,@State,@Status)";
                SqlCommand command = new SqlCommand(StrSQL, connection);
                command.Parameters.AddWithValue("@FirstName", user.FirstName);
                command.Parameters.AddWithValue("@LastName", user.LastName);
                command.Parameters.AddWithValue("@Email", user.Email);
                command.Parameters.AddWithValue("@Password", user.Password);
                command.Parameters.AddWithValue("@Phone", user.Phone);
                command.Parameters.AddWithValue("@Gender", user.Gender ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@City", user.City ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Country", user.Country ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@ImageUser", user.ImageUser ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@CreatedAt", user.CreatedAt);
                command.Parameters.AddWithValue("@ModifiedAt", user.ModifiedAt);
                command.Parameters.AddWithValue("@FullAddress", user.FullAddress ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Role", user.Role);
                command.Parameters.AddWithValue("@State", user.State);
                command.Parameters.AddWithValue("@Status", user.Status);
                //FirstName,LastName,Email,Password,Phone,Gender,City,Country,ImageUser,CreatedAt,ModifiedAt,FullAddress,Role

                //@FirstName, @LastName, @Email, @Password, @Phone, @Gender, @City, @Country, @ImageUser, @CreatedAt, @ModifiedAt, @FullAddress, @Role


                return Convert.ToInt32(DataBaseAccessUtilities.ScalarRequest(command));
            }
        }
        public static void Update(int id, User user)
        {
            using (SqlConnection con = DBConnection.GetConnection())
            {
                string StrSQL = "UPDATE [User] SET FirstName=@FirstName,LastName=@LastName,Email=@Email,[Password]=@Password,Phone=@Phone,Gender=@Gender,City=@City,Country=@Country,ImageUser=@ImageUser,CreatedAt=@CreatedAt,ModifiedAt=@ModifiedAt,FullAddress=@FullAddress,[Role]=@Role,State=@State,Status=@Status WHERE IDUser = @EntityKey";
                SqlCommand command = new SqlCommand(StrSQL, con);
                command.Parameters.AddWithValue("@EntityKey", id);
                command.Parameters.AddWithValue("@FirstName", user.FirstName);
                command.Parameters.AddWithValue("@LastName", user.LastName);
                command.Parameters.AddWithValue("@Email", user.Email);
                command.Parameters.AddWithValue("@Password", user.Password);
                command.Parameters.AddWithValue("@Phone", user.Phone);
                command.Parameters.AddWithValue("@Gender", user.Gender ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@City", user.City ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Country", user.Country ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@ImageUser", user.ImageUser ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@CreatedAt", user.CreatedAt);
                command.Parameters.AddWithValue("@ModifiedAt", user.ModifiedAt);
                command.Parameters.AddWithValue("@FullAddress", user.FullAddress ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Role", user.Role);
                command.Parameters.AddWithValue("@State", user.State);
                command.Parameters.AddWithValue("@Status", user.Status);
                DataBaseAccessUtilities.NonQueryRequest(command);
            }
        }
        public static object CheckEmailExistence(string email)
        {
            using (SqlConnection con = DBConnection.GetConnection())
            {
                string StrSQL = "SELECT COUNT(*) FROM [User] WHERE Email=@Email";
                SqlCommand command = new SqlCommand(StrSQL, con);
                command.Parameters.AddWithValue("@Email", email);
                return DataBaseAccessUtilities.ScalarRequest(command);
            }
        }
        public static void Delete(int EntityKey)
        {
            using (SqlConnection con = DBConnection.GetConnection())
            {
                string StrSQL = "DELETE FROM [User] WHERE IDUser=@EntityKey";
                SqlCommand command = new SqlCommand(StrSQL, con);
                command.Parameters.AddWithValue("@EntityKey", EntityKey);
                DataBaseAccessUtilities.NonQueryRequest(command);
            }
        }
        private static User GetEntityFromDataRow(DataRow dataRow)
        {
            User user = new User();
            user.IDUser = Convert.ToInt32(dataRow["IDUser"]);
            user.FirstName = dataRow["FirstName"].ToString();
            user.LastName = dataRow["LastName"].ToString();
            user.Email = dataRow["Email"].ToString();
            user.Password = dataRow["Password"].ToString();
            user.Phone = dataRow["Phone"].ToString();
            user.Gender = dataRow.IsNull("Gender") ? null : Convert.ToString(dataRow["Gender"]);
            user.City = dataRow.IsNull("City") ? null : Convert.ToString(dataRow["City"]);
            user.Country = dataRow.IsNull("Country") ? null : Convert.ToString(dataRow["Country"]);
            user.ImageUser = dataRow.IsNull("ImageUser") ? null : Convert.ToString(dataRow["ImageUser"]);
            user.CreatedAt = Convert.ToDateTime(dataRow["CreatedAt"]);
            user.ModifiedAt = Convert.ToDateTime(dataRow["ModifiedAt"]);
            user.FullAddress = dataRow.IsNull("FullAddress") ? null : Convert.ToString(dataRow["FullAddress"]);
            user.Role = Convert.ToString(dataRow["Role"]);
            user.State = Convert.ToBoolean(dataRow["State"]);
            user.Status = Convert.ToBoolean(dataRow["Status"]);
            return user;
        }
        private static List<User> GetListFromDataTable(DataTable dt)
        {
            List<User> list = new List<User>();
            if (dt != null)
            {
                foreach (DataRow dr in dt.Rows)
                    list.Add(GetEntityFromDataRow(dr));
            }
            return list;
        }

        public static User SelectById(int EntityKey)
        {
            using (SqlConnection con = DBConnection.GetConnection())
            {
                con.Open();
                string StrSQL = "SELECT * FROM [User] WHERE IDUser = @EntityKey";
                SqlCommand command = new SqlCommand(StrSQL, con);
                command.Parameters.AddWithValue("@EntityKey", EntityKey);
                DataTable dt = DataBaseAccessUtilities.SelectRequest(command);
                if (dt != null && dt.Rows.Count != 0)
                    return GetEntityFromDataRow(dt.Rows[0]);
                else
                    return null;
            }
        }
        public static List<User> SelectAll()
        {
            DataTable dataTable;
            using (SqlConnection con = DBConnection.GetConnection())
            {
                con.Open();
                string StrSQL = "SELECT * FROM [User]";
                SqlCommand command = new SqlCommand(StrSQL, con);
                dataTable = DataBaseAccessUtilities.SelectRequest(command);
            }
            return GetListFromDataTable(dataTable);
        }
    }
}
