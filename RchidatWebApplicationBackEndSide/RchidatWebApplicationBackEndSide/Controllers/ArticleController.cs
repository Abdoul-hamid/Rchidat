using Microsoft.AspNetCore.Mvc;
using RchidatWebApplicationBackEndSide.Models.BLL;
using RchidatWebApplicationBackEndSide.Models.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RchidatWebApplicationBackEndSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : Controller

    {

        // GET: api/<ArticleController>

        [HttpGet]

        public JsonResult Get()

        {

            try

            {

                List<Article> articles = BLL_Article.Get();

                return Json(new { success = true, message = "Articles found", data = articles });

            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }

        // GET: api/<ArticleController>

        [HttpGet("ArticlesByCatalog/{id}")]

        public JsonResult GetByCatalog(int id)

        {

            try

            {

                List<Article> articles = BLL_Article.GetByCatalogId(id);

                return Json(new { success = true, message = "Articles found", data = articles });

            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }



        // GET api/<ArticleController>/5

        [HttpGet("{id}")]

        public JsonResult Get(int id)

        {

            try

            {

                Article article = BLL_Article.Get(id);

                return Json(new { success = true, message = "Article found", data = article });

            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }



        // POST api/<ArticleController>

        [HttpPost]

        public JsonResult Post([FromBody] Article article)

        {

            try

            {





                article.IDArticle = BLL_Article.Add(article);

                return Json(new { success = true, message = "Successfully added", data = article });





            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }



        // PUT api/<ArticleController>/5

        [HttpPut("{id}")]

        public JsonResult Put(int id, [FromBody] Article article)

        {

            try

            {

                BLL_Article.Update(id, article);

                return Json(new { success = true, message = "Successfully modified", data = article });

            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }



        // DELETE api/<ArticleController>/5

        [HttpDelete("{id}")]

        public JsonResult Delete(int id)

        {

            try

            {

                BLL_Article.Delete(id);

                return Json(new { success = true, message = "Successfully deleted" });

            }

            catch (Exception ex)

            {

                return Json(new { success = false, message = ex.Message });

            }

        }

    }
}
