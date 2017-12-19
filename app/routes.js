module.exports = (app, db, auth) => {

    // init controllers

    let AuthController = require('./controllers/AuthController')(),
        HomeController = require('./controllers/HomeController')(),
        TweetController = require('./controllers/TweetController')();


    // routes

    app.get('/login', AuthController.get.login);
    app.get('/register', AuthController.get.register);

    app.post('/login', AuthController.post.login);
    app.post('/register', AuthController.post.register);

    // for auth only

    app.get('/', auth, HomeController.index);

    // app.post('/tweets/create', TweetController.create);

};