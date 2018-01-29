using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ID_Web.RestApi.Models;
using System.Net.Http;

namespace ID_Web.RestApi.Controllers
{
    [Route("api/events")]
    public class EventsController : Controller
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
        public HttpResponseMessage Post([FromBody]ApiCreateEvent value)
        {
            return new HttpResponseMessage();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]ApiCreateEvent value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
