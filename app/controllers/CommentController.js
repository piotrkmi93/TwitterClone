module.exports = () => {

    let Comment = require('../models/Comment');

    let self = {

        create: (request, response) => {

            let content  = request.body.content,
                post     = request.body.post,
                user     = request.session.user;

            Comment.create({
                content: content,
                post: post,
                user: user
            });

            response.redirect('/');

        }

    };

    return self;

};