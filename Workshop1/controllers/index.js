const homeController = require('./homeController');
const aboutController = require('./aboutController');
const createController = require('./createController');
const detailsController = require('./detailsController');
const postCreateController = require('./postCreateController');




module.exports = {
    home: homeController,
    about: aboutController,
    create: createController,
    details: detailsController,
    createPost: postCreateController,
};