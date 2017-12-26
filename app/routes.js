module.exports = (app, auth, guest) => {

    // init controllers

    let AuthController      = require('./controllers/AuthController')(),
        HomeController      = require('./controllers/HomeController')(),
        TweetController     = require('./controllers/TweetController')(),
        CommentController   = require('./controllers/CommentController')(),
        UserController      = require('./controllers/UserController')();


    // routes

    app.get('/login', guest, AuthController.get.login);
    app.get('/register', guest, AuthController.get.register);

    app.post('/login', guest, AuthController.post.login);
    app.post('/register', guest, AuthController.post.register);

    // for auth only

    app.get('/logout', auth, AuthController.get.logout);

    app.post('/tweets/create', auth, TweetController.create);
    app.post('/tweets/delete', auth, TweetController.delete);

    app.post('/comments/create', auth, CommentController.create);
    app.post('/comments/delete', auth, CommentController.delete);


    app.get('/profile/:id', auth, UserController.index);
    app.post('/profile/update', auth, UserController.update);


    app.get('/', auth, HomeController.index);

};