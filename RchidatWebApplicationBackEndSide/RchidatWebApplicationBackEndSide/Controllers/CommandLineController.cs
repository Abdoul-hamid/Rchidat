using Microsoft.AspNetCore.Mvc;
using RchidatWebApplicationBackEndSide.Models.BLL;
using RchidatWebApplicationBackEndSide.Models.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RchidatWebApplicationBackEndSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommandLineController : Controller
    {
        // GET: api/<CommandLineController>
        [HttpGet]
        public JsonResult Get()
        {
            try
            {
                List<CommandLine> commandLine = BLL_CommandLine.Get();
                return Json(new { success = true, message = "Commands line Not Found", data = commandLine });
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
        }

        // GET api/<CommandLineController>/5
        [HttpGet("{id1}/{id2}")]
        public JsonResult Get(int id1, int id2)
        {
            try
            {
                CommandLine commandLine = BLL_CommandLine.Get(id1, id2);
                return Json(new { success = true, message = "Commands line Not Found", data = commandLine });
            }
            catch (Exception e)
            {
                return Json(new { success = false, messsage = e.Message });
            }
        }

        // POST api/<CommandLineController>
        [HttpPost]
        public JsonResult Post([FromBody] CommandLine commandLine)
        {
            try
            {
                BLL_CommandLine.Add(commandLine);
                return Json(new { success = true, message = "Successfully Added", data = commandLine });
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
        }

        // PUT api/<CommandLineController>/5
        [HttpPut("{id1}/{id2}")]
        public JsonResult Put(int id1,int id2, [FromBody] CommandLine commandLine)
        {
            try
            {
                BLL_CommandLine.Update(id1,id2, commandLine);
                return Json(new { success = true, message = "Successfully Updated", data = commandLine });
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
        }

        // DELETE api/<CommandLineController>/5
        [HttpDelete("{id1}/{id2}")]
        public JsonResult Delete(int id1,int id2)
        {
            try
            {
                BLL_CommandLine.Delete(id1, id2);
                return Json(new { success = true, message = "Successfully Deleted" });
            }
            catch (Exception e)
            {
                return Json(new { success = false, message = e.Message });
            }
        }
    }
}
