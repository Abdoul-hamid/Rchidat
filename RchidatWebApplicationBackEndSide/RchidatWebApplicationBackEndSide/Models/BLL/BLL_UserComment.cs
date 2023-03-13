using RchidatWebApplicationBackEndSide.Models.DAL;
using RchidatWebApplicationBackEndSide.Models.Entities;

namespace RchidatWebApplicationBackEndSide.Models.BLL
{
    public class BLL_UserComment
    {
        public static int Add(UserComment userComment) => DAL_UserComment.Add(userComment);
        public static void Update(int id, UserComment userComment) => DAL_UserComment.Update(id, userComment);
        public static void Delete(int id) => DAL_UserComment.Delete(id);
        public static UserComment Get(int id) => DAL_UserComment.SelectById(id);
        public static List<UserComment> Get() => DAL_UserComment.SelectAll();
    }
}