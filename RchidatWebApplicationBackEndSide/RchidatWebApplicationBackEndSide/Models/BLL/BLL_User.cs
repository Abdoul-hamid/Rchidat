using RchidatWebApplicationBackEndSide.Models.DAL;
using RchidatWebApplicationBackEndSide.Models.Entities;
using static RchidatWebApplicationBackEndSide.Models.BLL.BLL_User;

namespace RchidatWebApplicationBackEndSide.Models.BLL
{
    public class BLL_User
    {   
        public static int Add(User user) => DAL_User.Add(user);
        public static void Update(int id, User user) => DAL_User.Update(id, user);
        public static void Delete(int id) => DAL_User.Delete(id);
        public static User Get(int id) => DAL_User.SelectById(id);
        public static List<User> Get() => DAL_User.SelectAll();
        public static object CheckEmailExistence(string email) => DAL_User.CheckEmailExistence(email);
    }
}
