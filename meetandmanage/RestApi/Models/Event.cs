using System;
namespace ID_Web.RestApi.Models
{
    public class ApiEvent
    {
        public int Id { get; }
        public string Title { get; set; }
    }

    public class ApiCreateEvent
    {
        public string Title { get; set; }
    }
}
