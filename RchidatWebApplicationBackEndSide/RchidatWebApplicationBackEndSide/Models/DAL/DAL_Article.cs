using Microsoft.Data.SqlClient;
using RchidatWebApplicationBackEndSide.Models.Connection;
using RchidatWebApplicationBackEndSide.Models.Entities;
using RchidatWebApplicationBackEndSide.Utilities;
using System;
using System.Data;

namespace RchidatWebApplicationBackEndSide.Models.DAL
{
    public class DAL_Article
    {
        public static int Add(Article article)
        {
            using (SqlConnection connection = DBConnection.GetConnection())
            {
                string StrSQL = "Insert Into [Article](IDCatalog,[Designation],[Description],Price,ImageArticle,MinStock,MaxStock,Quantity,ExpireDate,ReductionRate,LastPrice,State) output INSERTED.IDArticle Values (@IDCatalog, @Designation, @Description, @Price, @ImageArticle, @MinStock, @MaxStock, @Quantity, @ExpireDate, @ReductionRate, @LastPrice,@State)";
                SqlCommand command = new SqlCommand(StrSQL, connection);
                command.Parameters.AddWithValue("@IDCatalog", article.IDCatalog);
                command.Parameters.AddWithValue("@Designation", article.Designation);
                command.Parameters.AddWithValue("@Description", article.Description);
                command.Parameters.AddWithValue("@Price", article.Price);
                command.Parameters.AddWithValue("@ImageArticle", article.ImageArticle);
                command.Parameters.AddWithValue("@MinStock", article.MinStock);
                command.Parameters.AddWithValue("@MaxStock", article.MaxStock);
                command.Parameters.AddWithValue("@Quantity", article.Quantity);
                command.Parameters.AddWithValue("@ExpireDate", article.ExpireDate);
                command.Parameters.AddWithValue("@ReductionRate", article.ReductionRate);
                command.Parameters.AddWithValue("@LastPrice", article.LastPrice);
                command.Parameters.AddWithValue("@State", article.State);
                return Convert.ToInt32(DataBaseAccessUtilities.ScalarRequest(command));
            }
        }
        public static void Update(int id, Article article)
        {
            using (SqlConnection con = DBConnection.GetConnection())
            {
                string StrSQL = "UPDATE [Article] SET IDCatalog=@IDCatalog,[Designation]=@Designation,[Description]=@Description,[Price]=@Price,ImageArticle=@ImageArticle,MinStock=@MinStock,MaxStock=@MaxStock,Quantity=@Quantity,ExpireDate=@ExpireDate,ReductionRate=@ReductionRate,LastPrice=@LastPrice, State=@State WHERE IDArticle = @EntityKey";
                SqlCommand command = new SqlCommand(StrSQL, con);
                command.Parameters.AddWithValue("@EntityKey", id);
                command.Parameters.AddWithValue("@IDCatalog", article.IDCatalog);
                command.Parameters.AddWithValue("@Designation", article.Designation);
                command.Parameters.AddWithValue("@Description", article.Description);
                command.Parameters.AddWithValue("@Price", article.Price);
                command.Parameters.AddWithValue("@ImageArticle", article.ImageArticle);
                command.Parameters.AddWithValue("@MinStock", article.MinStock);
                command.Parameters.AddWithValue("@MaxStock", article.MaxStock);
                command.Parameters.AddWithValue("@Quantity", article.Quantity);
                command.Parameters.AddWithValue("@ExpireDate", article.ExpireDate);
                command.Parameters.AddWithValue("@ReductionRate", article.ReductionRate);
                command.Parameters.AddWithValue("@LastPrice", article.LastPrice);
                command.Parameters.AddWithValue("@State", article.State);
                DataBaseAccessUtilities.NonQueryRequest(command);
            }
        }
        public static void Delete(int EntityKey)
        {
            using (SqlConnection con = DBConnection.GetConnection())
            {
                string StrSQL = "DELETE FROM [Article] WHERE IDArticle=@EntityKey";
                SqlCommand command = new SqlCommand(StrSQL, con);
                command.Parameters.AddWithValue("@EntityKey", EntityKey);
                DataBaseAccessUtilities.NonQueryRequest(command);
            }
        }
        private static Article GetEntityFromDataRow(DataRow dataRow)
        {
            //Name,[Designation],[Description],Price,ImageArticle,MinStock,MaxStock,Quantity,ExpireDate,ReductionRate,LastPrice
            Article article = new Article();
            article.IDArticle = Convert.ToInt32(dataRow["IDArticle"]);
            article.IDCatalog = Convert.ToInt32(dataRow["IDCatalog"]);
            article.Designation = dataRow["Designation"].ToString();
            article.Description = Convert.ToString(dataRow["Description"]);
            article.Price = Convert.ToSingle(dataRow["Price"]);
            article.ImageArticle = dataRow["ImageArticle"].ToString();
            article.MinStock = Convert.ToInt32(dataRow["MinStock"]);
            article.MaxStock = Convert.ToInt32(dataRow["MaxStock"]);
            article.Quantity = Convert.ToInt32(dataRow["Quantity"]);
            article.ReductionRate = Convert.ToSingle(dataRow["ReductionRate"]);
            article.ExpireDate = Convert.ToDateTime(dataRow["ExpireDate"]);
            article.LastPrice = Convert.ToSingle(dataRow["LastPrice"]);
            article.State = Convert.ToBoolean(dataRow["State"]);
            return article;
        }
        private static List<Article> GetListFromDataTable(DataTable dt)
        {
            List<Article> list = new List<Article>();
            if (dt != null)
            {
                foreach (DataRow dr in dt.Rows)
                    list.Add(GetEntityFromDataRow(dr));
            }
            return list;
        }

        public static Article SelectById(int EntityKey)
        {
            using (SqlConnection con = DBConnection.GetConnection())
            {
                con.Open();
                string StrSQL = "SELECT * FROM [Article] WHERE IDArticle = @EntityKey";
                SqlCommand command = new SqlCommand(StrSQL, con);
                command.Parameters.AddWithValue("@EntityKey", EntityKey);
                DataTable dt = DataBaseAccessUtilities.SelectRequest(command);
                if (dt != null && dt.Rows.Count != 0)
                    return GetEntityFromDataRow(dt.Rows[0]);
                else
                    return null;
            }
        }
        public static List<Article> SelectAll()
        {
            DataTable dataTable;
            using (SqlConnection con = DBConnection.GetConnection())
            {
                con.Open();
                string StrSQL = "SELECT * FROM [Article]";
                SqlCommand command = new SqlCommand(StrSQL, con);
                dataTable = DataBaseAccessUtilities.SelectRequest(command);
            }
            return GetListFromDataTable(dataTable);
        }
        public static List<Article> SelectAllByCalalogId(int id)
        {
            DataTable dataTable;
            using (SqlConnection con = DBConnection.GetConnection())
            {
                con.Open();
                string StrSQL = "SELECT * FROM [Article] WHERE IDCatalog=@IDCatalog";
                SqlCommand command = new SqlCommand(StrSQL, con);
                command.Parameters.AddWithValue("@IDCatalog", id);
                dataTable = DataBaseAccessUtilities.SelectRequest(command);
            }
            return GetListFromDataTable(dataTable);
        }
    }
}
