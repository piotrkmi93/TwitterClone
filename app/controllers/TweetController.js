let Post = require('../models/Post'),
    Comment = require('../models/Comment');

module.exports = () => {

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
        },

        delete: (request, response) => {

            let post_id = request.body.post_id,
                user_id = request.body.user_id;

            if(user_id === request.session.user._id){
                Post.remove( { "_id": post_id }, (err, status) => {
                    if(err) throw err;
                    else Comment.remove( { "post": post_id }, (err2, status) => {
                        if(err2) throw err;
                        else response.redirect('/');
                    });
                });
            }
            else response.redirect('/');

        }

    };

    return self;

};