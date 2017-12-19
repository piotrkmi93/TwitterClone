module.exports = () => {

    let self = {

        create: (request, response) => {
            response.redirect('/');
        }

    };

    return self;

};