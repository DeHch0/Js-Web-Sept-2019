const userController = require('../controllers/userController');

const models = require('../models');
const { jwt } = require('../utils');

const app = require('express')();
const cookieParser = require('cookie-parser');

app.use(cookieParser());


function getHome(req, res) {

    let username = req.cookies['username'];

    if (username) {
        models.userSchema.findOne({ username }).populate('expences').then(user => {
            let id = user._id;
            let expences = user.expences;

            res.render('index', { expences, userId: id });

        })
    } else {
        return res.render('index');
    }

}



module.exports = {
    getHome,
};