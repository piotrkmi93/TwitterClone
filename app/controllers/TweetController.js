module.exports = () => {

    let Post = require('../models/Post');

    let self = {

        create: (request, response) => {

            let content = request.body.content,
                image   = request.body.image || undefined,
                user    = request.session.user;

            Post.create({
                content: content,
                image: image,
                user: user
            });

            response.redirect('/');
        }

    };

    return self;

};

// TODO: stworzyć skrypt wyciągający base64 z obrazka i to jego wysyłać do metody powyżej