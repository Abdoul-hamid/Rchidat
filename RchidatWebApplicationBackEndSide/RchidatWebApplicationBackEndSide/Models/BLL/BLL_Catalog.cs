using RchidatWebApplicationBackEndSide.Models.DAL;
using RchidatWebApplicationBackEndSide.Models.Entities;

namespace RchidatWebApplicationBackEndSide.Models.BLL
{
    public class BLL_Catalog
    {
        public static int Add(Catalog catalog) => DAL_Catalog.Add(catalog);
        public static void Update(int id, Catalog catalog) => DAL_Catalog.Update(id,catalog);
        public static void Delete(int id) => DAL_Catalog.Delete(id);
        public static Catalog Get(int id) => DAL_Catalog.SelectById(id);
        public static List<Catalog> Get() => DAL_Catalog.SelectAll();
    }
}
