using RchidatWebApplicationBackEndSide.Models.DAL;
using RchidatWebApplicationBackEndSide.Models.Entities;

namespace RchidatWebApplicationBackEndSide.Models.BLL
{
    public class BLL_Article
    {
        public static int Add(Article article) => DAL_Article.Add(article);
        public static void Update(int id, Article article) => DAL_Article.Update(id, article);
        public static void Delete(int id) => DAL_Article.Delete(id);
        public static Article Get(int id) => DAL_Article.SelectById(id);
        public static List<Article> Get() => DAL_Article.SelectAll();
        public static List<Article> GetByCatalogId(int id) => DAL_Article.SelectAllByCalalogId(id);
    }
}
