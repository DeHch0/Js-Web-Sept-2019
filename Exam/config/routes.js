const path = require('path');
const controllers = require(path.normalize(path.join(__dirname, '../controllers')));
const { auth } = require('../utils');
const utils = require('../utils');

module.exports = (app) => {
    //home
    app.get('/', controllers.home);

    app.get('/create/expence', auth(), controllers.getCreate);
    app.post('/create/expence', auth(), controllers.postCreate);

    app.post('/refill', auth(), controllers.postReffil);

    app.get('/report/:id', auth(), controllers.getReport);
    app.get('/remove/:id', auth(), controllers.getRemove);



    app.get('/profile/:id', auth(), controllers.getProfile);
    //user
    app.get('/login', controllers.getLogin);
    app.post('/login', controllers.postLogin);

    app.get('/register', controllers.getRegister);
    app.post('/register', controllers.postRegister);

    app.get('/logout', controllers.logout);

    app.get('*', (req, res) => {
        res.render('404', { layout: '404' });
    })

};