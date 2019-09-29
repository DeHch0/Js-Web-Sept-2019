module.exports = (req , res) => {
    console.log(req.body);

    const fs = require('fs');
    const file = require('../models/cubeModel.js');

    file.createCube(Math.floor(Math.random() * 10000000) + 1 , req.body.name , req.body.description , req.body.imageUrl , req.body.difficultyLevel);

    res.redirect('/');
};