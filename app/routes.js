module.exports = (app, auth, guest) => {

    // init controllers

    let AuthController = require('./controllers/AuthController')(),
        HomeController = require('./controllers/HomeController')(),
        TweetController = require('./controllers/TweetController')(),
        CommentController = require('./controllers/CommentController')();


    // routes

    app.get('/login', guest, AuthController.get.login);
    app.get('/register', guest, AuthController.get.register);

    app.post('/login', guest, AuthController.post.login);
    app.post('/register', guest, AuthController.post.register);

    // for auth only

    app.post('/tweets/create', auth, TweetController.create);
    app.post('/tweets/comment', auth, CommentController.create);

    app.get('/', auth, HomeController.index);

};