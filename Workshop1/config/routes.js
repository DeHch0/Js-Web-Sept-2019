const path = require('path');
const controllers = require(path.normalize(path.join(__dirname , '../controllers')));

module.exports = (app) => {

    app.get('/' , controllers.home);

    app.get('/about' , controllers.about);

    app.get('/create' , controllers.create);

    app.get('/details/:id' , controllers.details);

    app.post('/create' , controllers.createPost);
};