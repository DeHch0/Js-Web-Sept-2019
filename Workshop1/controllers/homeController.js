module.exports = (req, res) => {

    let indexObject = {};

    indexObject.cubes = require('../config/database.json');

    res.render('index' , indexObject);
};