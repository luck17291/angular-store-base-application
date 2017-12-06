using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestProject
{
    [BsonIgnoreExtraElements]
    public class Task
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool IsCompleted { get; set; }

        public Task() { }

        public Task(string name, bool isCompleted)
        {
            Id = Guid.NewGuid().ToString();
            Name = name;
            IsCompleted = isCompleted;
        }

        public Task(string id, string name, bool isCompleted = false)
        {
            Id = id;
            Name = name;
            IsCompleted = isCompleted;
        }

        public Task(string json)
        {
            JObject jObject = JObject.Parse(json);
            JToken jTask = jObject["Task"];
            Name = (string)jTask["Id"];
            Name = (string)jTask["Name"];
            IsCompleted = (bool)jTask["IsCompletes"];
        }
    }
}
