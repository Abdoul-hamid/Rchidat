using Microsoft.AspNetCore.Mvc;
using RchidatWebApplicationBackEndSide.Models.BLL;
using RchidatWebApplicationBackEndSide.Models.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RchidatWebApplicationBackEndSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommandController : Controller

    {

        // GET: api/<CommandController>

        [HttpGet]

        public JsonResult Get()

        {

            try

            {

                List<Command> commands = BLL_Command.Get();

                return Json(new { success = true, message = "Commands found", data = commands });

            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }



        // GET api/<CommandController>/5

        [HttpGet("{id}")]

        public JsonResult Get(int id)

        {

            try

            {

                Command command = BLL_Command.Get(id);

                return Json(new { success = true, message = "Command found", data = command });

            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }



        // POST api/<CommandController>

        [HttpPost]

        public JsonResult Post([FromBody] Command command)

        {

            try

            {

                command.IDCommand = BLL_Command.Add(command);

                return Json(new { success = true, message = "Successfully added", data = command });





            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }



        // PUT api/<CommandController>/5

        //[HttpPut("{id}")]

        //public JsonResult Put(int id, [FromBody] Command command)

        //{ 

        //}



        // DELETE api/<CommandController>/5

        [HttpDelete("{id}")]

        public JsonResult Delete(int id)

        {

            try

            {

                BLL_Command.Delete(id);

                return Json(new { success = true, message = "Successfully deleted" });

            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }

    }
}
