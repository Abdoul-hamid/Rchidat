using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RchidatWebApplicationBackEndSide.Models.BLL;
using RchidatWebApplicationBackEndSide.Models.Entities;
using RchidatWebApplicationBackEndSide.Utilities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RchidatWebApplicationBackEndSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : Controller
    {
        [AllowAnonymous]
        [HttpPost]
        public JsonResult Signup([FromBody] User user)
        {
            try
            {
                int count = Convert.ToInt32(BLL_User.CheckEmailExistence(user.Email));
                if (count >0)
                {
                    return Json(new { success = false, message = "L'email existe déjà, changer le puis réessayez", data = user });
                }
                else
                {
                    user.Password = EncryptionDecryption.Encrypt(user.Password);
                    user.IDUser = BLL_User.Add(user);
                    return Json(new { success = true, message = "User successfully added", data = user });
                }
                //user.Gender = "Femme";
                //user.City = "Niamey";
                //user.Country = "Niger";
                //user.Role = "Client";
                //user.CreatedAt = DateTime.Now;
                //user.ModifiedAt = DateTime.Now;
                //user.FullAddress = "Niamey, Niger";
                //user.Password = EncryptionDecryption.Encrypt(user.Password);
                //user.IdUser = BLL_User.Add(user);
                //return Json(new { success = true, message = "User successfully added", data = user });
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
        }
    }
}
