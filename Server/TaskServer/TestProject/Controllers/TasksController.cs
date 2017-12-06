using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using TestProject;

namespace TestProject.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        private IMongoCollection<Task> collection;

        public TasksController(IPersistance _persistance)
        {
            collection = _persistance.getDbCollecion();
        }

        // GET api/values
        [HttpGet]
        public string Get()
        {
            var filter = Builders<Task>.Filter.Where(t => t.Name != null);
            var document = collection.Find(filter).ToList();
            var json = JsonConvert.SerializeObject(document);
            return json;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(string id)
        {
            var filter = Builders<Task>.Filter.Eq("_id", id);
            var entity = collection.Find(filter).FirstOrDefault();

            var json = JsonConvert.SerializeObject(entity);
            return json;
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Task newTask)
        {
            if (newTask == null) return Ok();
          
            newTask.Id = Guid.NewGuid().ToString();
            collection.InsertOne(newTask);
            return Ok();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody]Task updateTask)
        {
            var filter = Builders<Task>.Filter.Eq("_id", id);
            var update = Builders<Task>.Update
                .Set("Name", updateTask.Name)
                .Set("IsCompleted", updateTask.IsCompleted);
            collection.UpdateOne(filter, update);
            return Ok();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var filter = Builders<Task>.Filter.Eq("_id", id);
            collection.DeleteOne(filter);
            return Ok();
        }
    }
}
