using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Identity.Web.Resource;
using Microsoft.Extensions.Configuration;
using FoodApp;

namespace FoodApi
{
    [Route("[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        public FoodController(FoodDBContext context, IConfiguration config, EventGridPublisher evtpub)
        {
            ctx = context;
            cfg = config.Get<FoodConfig>();
            publisher = evtpub;
        }

        FoodDBContext ctx;
        FoodConfig cfg;
        EventGridPublisher publisher;

        // http://localhost:PORT/food
        [HttpGet()]
        public IEnumerable<FoodItem> GetFood()
        {
            verfiyScope(); // could be implemented using a custom filter
            return ctx.Food.ToArray();
        }

        // http://localhost:PORT/food/3
        [HttpGet("{id}")]
        public FoodItem GetById(int id)
        {
            verfiyScope();
            return ctx.Food.FirstOrDefault(v => v.ID == id);
        }

        // http://localhost:PORT/food
        [HttpPost()]
        public FoodItem InsertFood(FoodItem item)
        {
            verfiyScope();
            ctx.Food.Add(item);
            ctx.SaveChanges();

            if (cfg.FeatureManagement.PublishEvent)
            {
                publisher.PublishEvent(item, FoodEventType.Update);
            }
            return item;
        }

        [HttpPut()]
        public FoodItem UpdateFood(FoodItem item)
        {
            verfiyScope();
            ctx.Food.Attach(item);
            ctx.Entry(item).State = EntityState.Modified;
            ctx.SaveChanges();

            if (cfg.FeatureManagement.PublishEvent)
            {
                publisher.PublishEvent(item, FoodEventType.Update);
            }
            return item;
        }

        // http://localhost:PORT/food
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            verfiyScope();
            var item = GetById(id);
            if (item != null)
            {
                ctx.Remove(item);
                ctx.SaveChanges();
            }

            if (cfg.FeatureManagement.PublishEvent)
            {
                publisher.PublishEvent(item, FoodEventType.Update);
            }

            return Ok();
        }

        // http://localhost:PORT/food/env
        [HttpGet()]
        [Route("env")]
        public object GetConfig()
        {
            verfiyScope();
            var val = Environment.GetEnvironmentVariables();
            return val;
        }

        //TODO: Refactor to filter
        [NonAction]
        public void verfiyScope()
        {
            if (cfg.App.AuthEnabled)
            {
                string[] scopeRequiredByApi = new string[] { "access_as_user" };
                HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            }
        }
    }
}