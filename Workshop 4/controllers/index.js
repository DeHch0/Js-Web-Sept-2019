const homeController = require('./homeController');
const aboutController = require('./aboutController');
const cubeController = require('./cubeController');
const userController = require('./userController');

module.exports = {
    home: homeController.getHome,
    about: aboutController.about,
    details: cubeController.getDetails,
    error: homeController.notFound,

    create: cubeController.getCreateCube,
    createPost: cubeController.postCreateCube,

    getEditCube: cubeController.getEditCube,
    postEditCube: cubeController.postEditCube,

    getRemoveCube: cubeController.getRemoveCube,
    postRemoveCube: cubeController.postRemoveCube,

    attach: cubeController.getAttachAccessory,
    postAttach: cubeController.postAttachAccessory,

    createAccessory: cubeController.getCreateAccessory,
    postCreateAccessory: cubeController.postCreateAccessory,

    authorization: userController.auth,
    getLogin: userController.getLogin,
    postLogin: userController.postLogin,
    getRegister: userController.getRegister,
    postRegister: userController.postRegister,
    logout: userController.logout,
};