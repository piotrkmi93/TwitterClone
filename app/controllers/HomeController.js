module.exports = () => {

    let self = {

        index: (request, response) => {
            response.render('index');
        }

    };

    return self;

};