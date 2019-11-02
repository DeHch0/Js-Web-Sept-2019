const app = require('express')();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const utils = require('../utils');
const models = require('../models/');

app.use(cookieParser());

app.use(bodyParser.urlencoded(true));


function getLogin(rez, res) {
    res.render('login', { layout: 'login' });
}


function postLogin(req, res, next) {
    const { username, password } = req.body;

    if (username.length < 3 || username.length > 20) {
        return res.render('login', { layout: 'login', errors: ['Username must be between 3 and 20 charachers !'] });
    }

    if (password.length < 3 || password.length > 20) {
        return res.render('login', { layout: 'login', errors: ['Password must be between 3 and 20 charachers !'] });
    }

    models.userSchema.findOne({ username }).then(user => {
        if (user === null) {
            return res.render('login', { layout: 'login', errors: ['Username doesn\'t exist'] });
        } else if (!user.matchPassword(password)) {
            return res.render('login', { layout: 'login', errors: ['Wrong password or username!'] });
        } else {
            const token = utils.jwt.createToken({ id: user._id });
            res
                .cookie('auth_cookie', token)
                .cookie('username', user.username)
                .redirect('/');

        }
    }).catch(e => console.log(e));
}




function getRegister(req, res) {
    res.render('register', { title: 'Register now for free', layout: 'register' });
}

function postRegister(req, res) {
    const { username, password, repeatPassword } = req.body;
    let amount = req.body.amount ? req.body.amount : 0;

    if (password !== repeatPassword) {
        res.render('register', {
            layout: 'register',
            errors: [
                'Password and repeat password don\'t match!'
            ]
        });
        return;
    }

    return models.userSchema.create({ username, password, amount }).then(() => {
        res.redirect('/login');
    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.render('register', {
                layout: 'register',
                errors: [
                    'Username already taken!'
                ]
            });
            return;
        }

        console.log(err);
    });

}


function logout(req, res) {

    res.clearCookie('auth_cookie')
        .clearCookie('username')
        .redirect('/');

}

function getProfile(req, res) {
    let { id } = req.params;

    models.userSchema.findById(id).populate('expences').then(profile => {

        let exp = profile.expences;
        let totalExpences = 0;
        exp.forEach(element => {
            totalExpences += element.total;
        });

        let available = profile.amount - totalExpences;

        console.log(available)

        res.render('profile', { layout: 'profile', profile, available })
    }).catch(e => {
        console.log('error due profile get');
        console.log(e);
    })
}

module.exports = {
    // auth,
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    logout,
    getProfile,
};