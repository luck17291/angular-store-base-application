using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestProject
{
    public interface IPersistance
    {
        IMongoCollection<Task> getDbCollecion();
    }

    public class Persistance: IPersistance
    {
        public IMongoCollection<Task> getDbCollecion()
        {
            MongoClient connection = new MongoClient("mongodb://orient:orient@ds143744.mlab.com:43744/candidates");
            var db = connection.GetDatabase("candidates");
            return db.GetCollection<Task>("TaskCollection");
        }
    }
}
