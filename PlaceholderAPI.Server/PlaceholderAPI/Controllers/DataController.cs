using Microsoft.AspNetCore.Mvc;
using PlaceholderAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace PlaceholderAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly string serviceUrl = "https://jsonplaceholder.typicode.com/photos";

        private IEnumerable<Photo> photos;

        static HttpClient client = new HttpClient();

        public DataController()
        {            
            GetData().Wait();
        }

        async Task GetData()
        {
            var response = await client.GetAsync(serviceUrl, HttpCompletionOption.ResponseContentRead);
            if (response.IsSuccessStatusCode)
            {                
                this.photos = await response.Content.ReadAsAsync<IEnumerable<Photo>>();
            }          
        }


        [HttpGet]
        [Route("page")]
        public IEnumerable<Photo> Get(int from = 0, int itemsPerPage = 10)
        {
            return photos.Skip(from).Take(itemsPerPage);
        }

        [HttpGet]
        [Route("pageFiltered")]
        public ResponseDTO GetFiltered(string query = "", string sort = "", int from = 0, int itemsPerPage = 16)
        {
            var result = photos.Where(p => p.Title.Contains(query ?? string.Empty));

            if (!string.IsNullOrEmpty(sort))
                result = sort == "asc" ? result.OrderBy(p => p.Title) : result.OrderByDescending(p => p.Title);

            return new ResponseDTO 
            { 
                From = from, 
                Query = query, 
                ItemsPerPage = itemsPerPage, 
                Photos = result.Skip(from).Take(itemsPerPage), 
                NumbersFound = result.Count() 
            };
        }
    }
}
