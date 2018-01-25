using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ID_Web.RestApi.Models;

namespace ID_Web.RestApi.Controllers
{
    [Route("api/events")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<Event> GetAll()
        {
            return new Event[]
            {
                new Event() {
                    Id = 3,
                    Title = "Title"
                }
            };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Event Get(int id)
        {
            return new Event()
            {
                Id = 3,
                Title = "Title"
            };
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
