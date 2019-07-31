const express = require('express');
const app = express();
const dbConnection = require('./blogScripts/databaseConnection');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    let dbData;
    dbConnection.connectToDB().then((result) => {
        console.log(result);
        dbData = dbConnection.parseDBResult(result);
        res.render('index', { data: dbData });
        console.log(dbData);
    });
});

app.get('/help', function(req, res) {
    res.send("This is helping you");
});

app.post('/', function(req, res) {
    res.render('index', {
        data: []
    });
    console.log(req.body.postData);
    dbConnection.writeToDB({
        sender: "Cool dude",
        content: req.body.postData,
        time: new Date().getTime()
    });
})

app.listen(3000, function() {
    console.log('Blog listening on port 3000!');
});