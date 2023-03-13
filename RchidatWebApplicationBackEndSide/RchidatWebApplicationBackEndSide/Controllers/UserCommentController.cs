using Microsoft.AspNetCore.Mvc;
using RchidatWebApplicationBackEndSide.Models.BLL;
using RchidatWebApplicationBackEndSide.Models.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RchidatWebApplicationBackEndSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCommentController : Controller
    {
        // GET: api/<UserCommentController>
        [HttpGet]
        public JsonResult Get()
        {
            try
            {
                List<UserComment> userComment = BLL_UserComment.Get();
                return Json(new { success = true, message = "Comments Not Found", data = userComment });
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
        }

        // GET api/<UserCommentController>/5
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            try
            {
                UserComment userComment = BLL_UserComment.Get(id);
                return Json(new { success = true, message = "Comment Not Found", data = userComment });
            }
            catch (Exception e)
            {
                return Json(new { success = false, messsage = e.Message });
            }
        }

        // POST api/<UserCommentController>
        [HttpPost]
        public JsonResult Post([FromBody] UserComment userComment)
        {
            try
            {
                userComment.IDComment = BLL_UserComment.Add(userComment);
                return Json(new { success = true, message = "Successfully Added", data = userComment });
            }
            catch (Exception e)
            {
                return Json(new { success = true, message = e.Message });
            }
        }

        // PUT api/<UserCommentController>/5
        [HttpPut("{id}")]
        public JsonResult Put(int id, [FromBody] UserComment userComment)
        {
            try
            {
                BLL_UserComment.Update(id, userComment);
                return Json(new { success = true, message = "Successfully Updated", data = userComment });
            }
            catch (Exception e)
            {
                return Json(new { success = true, message = e.Message });
            }
        }

        // DELETE api/<UserCommentController>/5
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            try
            {
                BLL_UserComment.Delete(id);
                return Json(new { success = true, message = "Successfully Deleted" });
            }
            catch (Exception e)
            {
                return Json(new { success = true, message = e.Message });
            }
        }
    }
}
