let express = require('express'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// config

app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    cookie: {}
}));

let db = mongoose.connect('mongodb://localhost:27017/twitter_clone');

// auth middleware validation

let auth = (request, response, next) => {
    if(request.session && request.session.user) next();
    return response.redirect('/login');
};

app.use((req,res,next) => {
    res.locals.user = req.session.user;
    res.locals.guest = !res.locals.user;
    next();
});

// begin app

require('./app/routes')(app, db, auth);

app.listen(3000);