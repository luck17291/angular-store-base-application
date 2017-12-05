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
        public string Name { get; set; }
        public bool IsCompletes { get; set; }

        public Task(string name, bool isCompleted = false)
        {
            Name = name;
            IsCompletes = isCompleted;
        }

        public Task(string json)
        {
            JObject jObject = JObject.Parse(json);
            JToken jTask = jObject["Task"];
            Name = (string)jTask["Name"];
            IsCompletes = (bool)jTask["IsCompletes"];
        }
    }
}
