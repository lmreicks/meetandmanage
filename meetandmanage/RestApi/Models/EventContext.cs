using System;
using Microsoft.EntityFrameworkCore;

namespace ID_Web.RestApi.Models;
{
    public class EventContext : DbContext
    {
        public EventContext(DbContextOptions<EventContext> options)
            : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }
    }
}
