const MongoClient = require('mongodb').MongoClient;
const dbPath = 'mongodb://localhost:27017';
module.exports = {
    connectToDB: function() {
        return MongoClient.connect(dbPath).then((db) => {
            console.log("Connected to db");
            let database = db.db("test");
            return database.collection("posts").find().toArray().then((result) => {
                return result;
            }).catch((err) => {
                throw err;
            });
        }).catch((err) => {
            throw err;
        });
    },
    parseDBResult: function(dbObject) {
        return JSON.parse(JSON.stringify(dbObject));
    },
    writeToDB: function(data) {
        MongoClient.connect(dbPath).then((db) => {
            let database = db.db("test");
            database.collection("posts").insertOne(data, (err, res) => {
                if (err) throw err;
                console.log("Inserted");
                db.close();
            })
        });
    }
};