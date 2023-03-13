using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RchidatWebApplicationBackEndSide.Models.BLL;
using RchidatWebApplicationBackEndSide.Models.Entities;
using System.IdentityModel.Tokens.Jwt;
using RchidatWebApplicationBackEndSide.Utilities;
using System.Security.Claims;
using System.Text;

namespace RchidatWebApplicationBackEndSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private IConfiguration _config;
        public LoginController(IConfiguration config)
        {
            _config = config;
        }
        [AllowAnonymous]
        [HttpPost]
        public JsonResult Login(UserLogin userLogin)
        {
            var user = Authenticate(userLogin);
            if (user != null)
            {
                var token = generate(user);
                return Json(new { success = true, message = "User successfully logged", data=user, token=token });
            }
            else
            {
                return Json(new { success = false, message = "Votre email ou le password est incorrect" });
            }
        }
        private string generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim("IDUser",user.IDUser.ToString()),
                new Claim("FirstName",user.FirstName),
                new Claim("LastName",user.LastName),
                new Claim(ClaimTypes.Email,user.Email),
                new Claim("Password",user.Password),
                //new Claim("Role",user.Role),
                new Claim(ClaimTypes.Role,user.Role== null ? "": user.Role),
                new Claim(ClaimTypes.Gender,user.Gender== null ? "": user.Gender),
                //new Claim("Gender",user.Gender),
                new Claim(ClaimTypes.MobilePhone,user.Phone== null ? "": user.Phone),
                new Claim(ClaimTypes.Country,user.Country == null ? "" : user.Country),
                new Claim("City",user.City == null ? "" : user.City),
                new Claim("FullAddress",user.FullAddress == null ? "": user.FullAddress),
                new Claim("ImageUser",user.ImageUser == null ? "": user.ImageUser),
                new Claim("CreatedAt",user.CreatedAt.ToString()),
                new Claim("ModifiedAt",user.ModifiedAt.ToString()),
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private User Authenticate(UserLogin userLogin)
        {
            var currentUser = BLL_User.Get().FirstOrDefault(o => o.Email == userLogin.Email && EncryptionDecryption.Decrypt(o.Password) == userLogin.Password);
            if(currentUser != null)
            {
                return currentUser;
            }
            else
            {
                return null;
            }
        }
    }
}
