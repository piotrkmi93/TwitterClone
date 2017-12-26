let Post = require('../models/Post');

module.exports = () => {

    let self = {

        index: (request, response) => {

            Post.aggregate([

                // przywołanie autora posta
                { $lookup: {
                        from: "users",
                        let: { "user_id": "$user" },
                        pipeline: [
                            { $match: { $expr: { $eq: [ "$_id", "$$user_id" ] } } },
                            { $project: {
                                    "name": { $concat: [ "$first_name", " ", "$last_name" ] },
                                    "avatar": 1,
                                    "sex": 1
                                }
                            }
                        ],
                        as: "user"
                    }
                },

                // przywołanie komentarzy do posta
                { $lookup: {
                        from: "comments",
                        let: { "post_id": "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: [ "$post", "$$post_id" ] } } },

                            // przywołanie autora komentarza
                            { $lookup: {
                                    from: "users",
                                    let: { "user_id": "$user" },
                                    pipeline: [
                                        { $match: { $expr: { $eq: [ "$_id", "$$user_id" ] } } },
                                        { $project: {
                                                "name": { $concat: [ "$first_name", " ", "$last_name" ] },
                                                "avatar": 1,
                                                "sex": 1
                                            }
                                        }
                                    ],
                                    as: "user"
                                }
                            },
                            { $sort: { created: 1 } },
                            { $project: {
                                    "content": 1,
                                    "user": { "$arrayElemAt": [ "$user", 0 ] }
                                }
                            }
                        ],
                        as: "comments"
                    }
                },
                { $sort: { created: -1 } },
                { $project: {
                        "content": 1,
                        "created": 1,
                        "updated": 1,
                        "image": 1,
                        "comments": 1,
                        "user": { "$arrayElemAt": [ "$user", 0 ] }
                    }
                }
            ],
            (err, posts) => response.render('index', { posts: posts.map(makeHumanTime) }))
        }

    };

    function makeHumanTime(post) {
        let created = new Date(post.created),
            updated = new Date(post.updated);
        post.created = "";
        post.updated = "";
        if(created.getDate() < 10) post.created += "0";
        if(updated.getDate() < 10) post.updated += "0";
        post.created += created.getDate() + ".";
        post.updated += updated.getDate() + ".";
        if(created.getMonth()+1 < 10) post.created += "0";
        if(updated.getMonth()+1 < 10) post.updated += "0";
        post.created += (created.getMonth()+1) + "." + created.getFullYear() + " ";
        post.updated += (updated.getMonth()+1) + "." + updated.getFullYear() + " ";
        if(created.getHours() < 10) post.created += "0";
        if(updated.getHours() < 10) post.updated += "0";
        post.created += created.getHours() + ":";
        post.updated += updated.getHours() + ":";
        if(created.getMinutes() < 10) post.created += "0";
        if(updated.getMinutes() < 10) post.updated += "0";
        post.created += created.getMinutes();
        post.updated += updated.getMinutes();
        return post;
    }

    return self;

};