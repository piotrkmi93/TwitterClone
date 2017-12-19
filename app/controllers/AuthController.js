module.exports = () => {

    let User = require('../models/User');

    let self = {

        get: {

            login: (request, response) => {
                response.render('auth/login', {
                    title: 'Logowanie',
                    err_code: request.query.err_code,
                    login: request.query.login
                });
            },

            register: (request, response) => {
                response.render('auth/register', {
                    title: 'Rejestracja',
                    err_code: request.query.err_code,
                    login: request.query.login
                });
            }

        },

        post: {

            login: (request, response) => {
                let login = request.body.login,
                    password = request.body.password;

                if(!login || !password) response.redirect('/login?err_code=1');

                User.findOne({ login: login }, (err, user) => {
                    if(err) throw err;
                    else if(!user) response.redirect('/login?err_code=2&login='+login);
                    else if(!user.compare(password)) response.redirect('/login?err_code=3');
                    else {
                        request.session.user = user;
                        request.session.save();
                        response.redirect('/');
                    }
                });
            },

            register: (request, response) => {
                let login = request.body.login,
                    password = request.body.password,
                    r_password = request.body.r_password,
                    first_name = request.body.first_name,
                    last_name = request.body.last_name,
                    birthday = request.body.birthday,
                    sex = request.body.sex;

                if( !login || !password || !r_password || !sex ||
                    !first_name || !last_name || !birthday) response.redirect('/register?err_code=1');
                if(password !== r_password) response.redirect('/register?err_code=2');

                User.create({
                    login: login,
                    password: password,
                    first_name: first_name,
                    last_name: last_name,
                    birthday: birthday,
                    sex: sex
                }, (err, user) => {
                   if(err) {
                       response.redirect('/register?err_code='+err.code+'&login='+login);
                   } else {
                       response.redirect('/login?login=' + login);
                   }
                });
            },

            logout: (request, response) => {

            }

        }

    };

    return self;

};