const express = require('express');
const app = express();
const dbConnection = require('./blogScripts/databaseConnection');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
var upload = multer({ dest: './uploads' });
const flash = require('connect-flash');
const User = require('./models/user');

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

app.get('/users/register', function(req, res) {
    res.render('register', { errors: [] });
});

app.get('/users/login', function(req, res) {
    res.render('login');
});

app.get('/users/members', function(req, res) {
    res.render('members');
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
});

app.post('/users/register', upload.single('profileImage'), [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email is required").not().isEmpty(),
        check("username", "Username is required").not().isEmpty(),
        check("password", "Password must be a password").not().isEmpty(),
        check("password2", "Passwords must match").equals("password")
    ],
    function(req, res) {
        let name = req.body.name;
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let password2 = req.body.password2;
        let profileImage;
        if (req.file) {
            console.log("uploading file");
            profileImage = req.file.filename;
        } else {
            console.log("no file uploaded");
            profileImage = 'noImage.jpg';
        }

        //check("name", "Name field is required").isEmail();

        let error = validationResult(req).errors;
        console.log(error);

        if (error.length > 0) {
            res.render('register', {
                errors: error
            });
        } else {
            console.log("no errors");
            let newUser = new User({
                name: name,
                email: email,
                username: username,
                password: password,
                profileImage: profileImage
            });
            User.createUser(newUser, function(err, user) {
                if (err) {
                    throw err;
                }
                console.log(user);
            });

            req.flash('success', "You are now registered and can login");
            res.location('/users/members');
            res.redirect('/users/members');
        }
    });

app.listen(3000, function() {
    console.log('Blog listening on port 3000!');
});