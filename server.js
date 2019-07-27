const express = require('express');
const app = express();
const dbConnection = require('./blogScripts/databaseConnection');

app.use(express.static('public'));

app.get('/', function(req, res) {
    let dbData;
    dbConnection.connectToDB().then((result) => {
        console.log(result);
        dbData = dbConnection.parseDBResult(result);
        res.render('index', { data: dbData });
        console.log(dbData);
        console.log(dbData[0].name);
        console.log(dbData[0].desc);
    });
});

app.get('/help', function(req, res) {
    res.send("This is helping you");
});

app.listen(3000, function() {
    console.log('Blog listening on port 3000!');
});

app.set('view engine', 'ejs');