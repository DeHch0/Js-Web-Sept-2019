const homeController = require('./homeController');
const userController = require('./userController');
const expencesController = require('./expencesController');

module.exports = {
    home: homeController.getHome,

    getCreate: expencesController.getExpences,
    postCreate: expencesController.postExpences,

    postReffil: expencesController.postReffil,

    getReport: expencesController.getReport,

    getRemove: expencesController.getRemove,

    getProfile: userController.getProfile,

    // authorization: userController.auth,
    getLogin: userController.getLogin,
    postLogin: userController.postLogin,
    getRegister: userController.getRegister,
    postRegister: userController.postRegister,


    logout: userController.logout,
};