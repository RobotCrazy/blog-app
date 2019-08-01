const express = require('express');
const app = express();
const dbConnection = require('./blogScripts/databaseConnection');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const expressValidator = require('express-validator');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
var upload = multer({ dest: './uploads' });
const flash = require('connect-flash');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(expressValidator({
//     errorFormatter: function(param, msg, value) {
//         var namespace = param.split('.'),
//             root = namespace.shift(),
//             formParam = root;

//         while (namespace.length) {
//             formParam += '[' + namespace.shift() + ']';
//         }

//         return {
//             param: formParam,
//             msg: msg,
//             value: value
//         };
//     }
// }));
app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

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