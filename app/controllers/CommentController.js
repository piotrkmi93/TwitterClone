let Comment = require('../models/Comment');

module.exports = () => {

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

        },

        delete: (request, response) => {

            let comment_id = request.body.comment_id,
                user_id = request.body.user_id;

            if(user_id === request.session.user._id)
                Comment.remove( { "_id": comment_id }, (err, status) => {
                    if(err) throw err;
                    else response.redirect('/')
                });
            else response.redirect('/');

        }

    };

    return self;

};