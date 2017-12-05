using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace TestProject.Controllers
{
    [Route("api/[controller]")]
    public class TasksController : Controller
    {

        // GET api/values
        [HttpGet]
        public string Get()
        {
            MongoClient connection = new MongoClient("mongodb://orient:orient@ds143744.mlab.com:43744/candidates");
            var db = connection.GetDatabase("candidates");
            var collection = db.GetCollection<Task>("Candidates");

            var filter = Builders<Task>.Filter.Ne("Name", BsonString.Empty);
            var document = collection.Find(filter).ToList();
            var json = JsonConvert.SerializeObject(document);
            return json;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(string id)
        {
            MongoClient connection = new MongoClient("mongodb://orient:orient@ds143744.mlab.com:43744/candidates");
            var db = connection.GetDatabase("candidates");
            var collection = db.GetCollection<Task>("Candidates");

            var filter = Builders<Task>.Filter.Eq("_id", id);
            var entity = collection.Find(filter).FirstOrDefault();

            var json = JsonConvert.SerializeObject(entity);
            return json;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
            MongoClient connection = new MongoClient("mongodb://orient:orient@ds143744.mlab.com:43744/candidates");
            var db = connection.GetDatabase("candidates");
            var collection = db.GetCollection<Task>("Candidates");
            var newTask = new Task(value);
            collection.InsertOne(newTask);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
            MongoClient connection = new MongoClient("mongodb://orient:orient@ds143744.mlab.com:43744/candidates");
            var db = connection.GetDatabase("candidates");
            var collection = db.GetCollection<Task>("Candidates");
            var updateTask = new Task(value);

            var filter = Builders<Task>.Filter.Eq("_id", id);
            var entity = collection.Find(filter).FirstOrDefault();
            var update = Builders<Task>.Update.Set("Name", updateTask.Name);
            update.Set("IsCompeleted", updateTask.IsCompletes);
            collection.UpdateOne(filter, update);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            MongoClient connection = new MongoClient("mongodb://orient:orient@ds143744.mlab.com:43744/candidates");
            var db = connection.GetDatabase("candidates");
            var collection = db.GetCollection<Task>("Candidates");
            var filter = Builders<Task>.Filter.Eq("_id", id);
            collection.DeleteOne(filter);
        }
    }
}
