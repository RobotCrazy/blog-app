const MongoClient = require('mongodb').MongoClient;
const dbPath = 'mongodb://localhost:27017/test';
module.exports = {
    connectToDB: function() {
        // MongoClient.connect(dbPath, (err, db) => {
        //     if (err) throw err;
        //     console.log("Connected to db");
        //     let database = db.db("test");
        //     return database.collection("testCollection").find().toArray(
        //         /*(err, result) => {
        //                         if (err) throw err;
        //                         return result;
        //                     }*/
        //     );

        // });
        // db.close();

        return MongoClient.connect(dbPath).then((db) => {
            console.log("Connected to db");
            let database = db.db("test");
            return database.collection("testCollection").find().toArray().then((result) => {
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
    }
};