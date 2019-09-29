module.exports = (req, res) => {

    let allCubes = require('../config/database.json');

    let cube = allCubes.filter(function (cube) {
        return cube.id == req.params.id;
    });


    res.render('details', {layout: 'details', name: cube[0].name , description: cube[0].description , imageUrl: cube[0].image, difficult: cube[0].difficult});
};