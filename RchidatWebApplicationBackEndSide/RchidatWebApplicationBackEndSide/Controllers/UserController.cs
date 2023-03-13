using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RchidatWebApplicationBackEndSide.Models.BLL;
using RchidatWebApplicationBackEndSide.Models.Entities;
using RchidatWebApplicationBackEndSide.Utilities;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RchidatWebApplicationBackEndSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {


        [HttpGet("Admins")]
        [Authorize(Roles = "Administrator")]
        public IActionResult AdminsEndpoint()
        {
            var currentUser = GetCurrentUser();
            return Ok($"Hi {currentUser.FirstName}, your are an {currentUser.Role}");
        }
        [HttpGet("Seller")]
        [Authorize(Roles = "Seller")]
        public IActionResult SellersEndpoint()
        {
            var currentUser = GetCurrentUser();
            return Ok($"Hi{currentUser.FirstName}, your are an {currentUser.Role}");
        }
        [HttpGet("Client")]
        [Authorize(Roles = "Client")]
        public IActionResult ClientsEndpoint()
        {
           
            try
            {
                User user = GetCurrentUser();
                return Json(new { success = true, message = "User successfully added", data = user });
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
        }
        [HttpGet("AdministratorSellerClient")]
        [Authorize(Roles = "Seller,Administrator,Client")]
        public IActionResult AdminisSellersEndpoint()
        {
            var currentUser = GetCurrentUser();
            return Ok($"Hi{currentUser.FirstName}, your are an {currentUser.Role}");
        }
        [HttpGet("Public")]
        public IActionResult Public()
        {
            return Ok("Hi, you're on public property");
        }
        private User GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userClaims = identity.Claims;
                return new User
                {
                    FirstName = userClaims.FirstOrDefault(o => o.Type == "FirstName")?.Value,
                    LastName = userClaims.FirstOrDefault(o => o.Type == "LastName")?.Value,
                    Email = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                    //Role = userClaims.FirstOrDefault(o => o.Type == "Role").Value,
                    Role = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value,
                    //Gender = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Gender)?.Value,
                    Gender = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Gender)?.Value,
                    Phone = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.MobilePhone)?.Value,
                    Country = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Country)?.Value,
                    City = userClaims.FirstOrDefault(o => o.Type == "City")?.Value,
                    FullAddress = userClaims.FirstOrDefault(o => o.Type == "FullAddress")?.Value,
                    ImageUser = userClaims.FirstOrDefault(o => o.Type == "ImageUser")?.Value,
                    CreatedAt = DateTime.Parse(userClaims.FirstOrDefault(o => o.Type == "CreatedAt")?.Value),
                    ModifiedAt = DateTime.Parse(userClaims.FirstOrDefault(o => o.Type == "ModifiedAt")?.Value),
                    Password = userClaims.FirstOrDefault(o => o.Type == "Password")?.Value,
                    IDUser = int.Parse(userClaims.FirstOrDefault(o => o.Type == "IDUser")?.Value)
                };
            }
            return null;
        }


        // GET: api/<UserController>
        [HttpGet]
        public JsonResult Get()
        {
            try
            {
                List<User> users = BLL_User.Get();
                return Json(new {success=true,message= "Users successfully found", data=users});
            }
            catch(Exception e)
            {
                return Json(new {success=false, message=e.Message});
            }
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            try
            {
                User user = BLL_User.Get(id);
                user.Password = EncryptionDecryption.Decrypt(user.Password);
                return Json(new { success = true, message = "User successfully found", data = user });
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
        }

        // POST api/<UserController>
        [HttpPost]
        public JsonResult Post([FromBody] User user)
        {
            try
            {
                user.Password = EncryptionDecryption.Encrypt(user.Password);
                user.IDUser = BLL_User.Add(user);
                return Json(new { success = true, message = "User successfully added", data = user });
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public JsonResult Put(int id, [FromBody] User user)
        {
            try
            {
                user.Password = EncryptionDecryption.Encrypt(user.Password);
                BLL_User.Update(id,user);
                return Json(new { success = true, message = "User successfully updated", data = user });
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            try
            {
                BLL_User.Delete(id);
                return Json(new { success = true, message = "User successfully deleted"});
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
        }
    }
}
