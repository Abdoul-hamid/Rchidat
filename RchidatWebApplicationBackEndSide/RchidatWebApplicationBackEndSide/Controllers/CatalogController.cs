using Microsoft.AspNetCore.Mvc;
using RchidatWebApplicationBackEndSide.Models.BLL;
using RchidatWebApplicationBackEndSide.Models.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RchidatWebApplicationBackEndSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController : Controller

    {

        // GET: api/<CatalogController>

        [HttpGet]

        public JsonResult Get()

        {

            try

            {

                List<Catalog> catalogs = BLL_Catalog.Get();

                return Json(new { success = true, message = "Catalogs found", data = catalogs });

            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }



        // GET api/<CatalogController>/5

        [HttpGet("{id}")]

        public JsonResult Get(int id)

        {

            try

            {

                Catalog catalog = BLL_Catalog.Get(id);

                return Json(new { success = true, message = "Catalog found", data = catalog });

            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }



        // POST api/<CatalogController>

        [HttpPost]

        public JsonResult Post([FromBody] Catalog catalog)

        {

            try

            {

                catalog.IDCatalog = BLL_Catalog.Add(catalog);

                return Json(new { success = true, message = "Successfully added", data = catalog });





            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }



        // PUT api/<CatalogController>/5

        [HttpPut("{id}")]

        public JsonResult Put(int id, [FromBody] Catalog catalog)

        {

            try

            {

                BLL_Catalog.Update(id, catalog);

                return Json(new { success = true, message = "Successfully modified", data = catalog });

            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }



        // DELETE api/<CatalogController>/5

        [HttpDelete("{id}")]

        public JsonResult Delete(int id)

        {

            try

            {

                BLL_Catalog.Delete(id);

                return Json(new { success = true, message = "Successfully deleted" });

            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }

    }
}
