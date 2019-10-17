const path = require('path');
const controllers = require(path.normalize(path.join(__dirname, '../controllers')));
const userController = require('../controllers/userController');

module.exports = (app) => {
    //home
    app.get('/', controllers.home);

    //about
    app.get('/about', controllers.about);

    //cube
    app.get('/create', controllers.create);

    app.post('/create', controllers.createPost);

    app.get('/edit/:id', controllers.getEditCube);

    app.post('/edit/:id', controllers.postEditCube);

    app.get('/remove/:id', controllers.getRemoveCube);

    app.post('/delete/:id', controllers.postRemoveCube);

    //accessory
    app.get('/create/accessory', controllers.createAccessory);

    app.post('/create/accessory', controllers.postCreateAccessory);

    app.get('/details/:id', controllers.details);

    app.get('/attach/accessory/:id', controllers.attach);

    app.post('/attach/accessory/:id', controllers.postAttach);


    //user
    app.get('/login', controllers.getLogin);
    app.post('/login', controllers.postLogin);

    app.get('/register', controllers.getRegister);
    app.post('/register', controllers.postRegister);

    app.get('/logout', controllers.logout)

    app.get('*', controllers.error);
};