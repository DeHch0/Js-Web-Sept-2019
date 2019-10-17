const cubeModel = require('../models/Cube');
const userController = require('../controllers/userController');

const app = require('express')();
const cookieParser = require('cookie-parser');

app.use(cookieParser());


function getHome(req, res) {
    userController.auth(req, res).then(data => {
        console.log(data);

        const { from, to, search } = req.query;
        let query = {};
        if (search) {
            query = {...query, name: { $regex: search } };
        }
        if (to) {
            query = {...query, difficultyLevel: { $lte: +to } };
        }
        if (from) {
            query = {
                ...query,
                difficultyLevel: {...query.difficultyLevel, $gte: +from }
            };
        }


        cubeModel.find(query).then(cubes => {
            res.render('index', {
                title: 'Cubes',
                username: data.username,
                cubes,
                search,
                from,
                to,
            });
        }).catch((e) => {
            console.log(e.message);
        });
    }).catch(e => {
        console.log(e.message);
    })
}


function notFound(req, res) {
    res.render('404', {
        title: 'ooppSsS...',
        layout: '404'
    });
}



module.exports = {
    getHome,
    notFound,
};