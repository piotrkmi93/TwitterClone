let User = require('../models/User');

module.exports = () => {

    let self = {

        index: (request, response) => {

            User.findOne( { "_id": request.params.id }, (err, user) => {
                if(err) throw err;
                else {
                    let birthday = new Date(user.birthday);
                    user.birthday_to_show = "";
                    if(birthday.getDate() < 10) user.birthday_to_show += "0";
                    user.birthday_to_show += birthday.getDate() + ".";
                    if(birthday.getMonth()+1 < 10) user.birthday_to_show += "0";
                    user.birthday_to_show += (birthday.getMonth()+1) + "." + birthday.getFullYear();
                    response.render('user', {USER: user});
                }
            });

        },

        update: (request, response) => {

            let image = request.body.image,
                first_name = request.body.first_name,
                last_name = request.body.last_name,
                user = request.session.user;

            let set = {};
            if(image) set.avatar = image;
            if(first_name) set.first_name = first_name;
            if(last_name) set.last_name = last_name;

            User.update(
                { "_id": user._id },
                { "$set": set },
                (err, status) => {
                    if(err) throw err;
                    else {
                        if(image) request.session.user.avatar = image;
                        if(first_name) request.session.user.first_name = first_name;
                        if(last_name) request.session.user.last_name = last_name;
                        request.session.save();
                        response.redirect('/profile/'+user._id);
                    }
                }
            )

        }

    };

    return self;

};