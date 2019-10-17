const app = require('express')();
const userModel = require('../models/User');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cookieParser());

// app.use(bodyParser.urlencoded(true));

const options = { expiresIn: '2d' };
const secret = 'MySuperPrivateSecret';


function authenticateRoute(req, res, next) {
    const token = req.cookies('auth_cookie');

    if (token === undefined) {
        res.redirect('/login');
    } else {
        next
    }
}


function auth(req, res) {
    const token = req.cookies['auth_cookie'];

    if (token === undefined) {
        res.redirect('/login');
    } else {
        let payloads = jwt.verify(token, secret)

        return userModel
            .findById(payloads.userId);
        // console.log(payloads);
    }
}

function getLogin(req, res) {
    res.render('login', { layout: 'login' });
}

function postLogin(req, res, next) {
    const { username, password } = req.body;

    userModel.find({ username: username }, (err, authUser) => {
        if (authUser.length) {
            authUser = authUser[0];

            bcrypt.compare(password, authUser.password).then(result => {
                if (!result) {
                    res.render('login', {
                        title: 'Login',
                        layout: 'login'
                    });
                    console.log('user error !');
                    return;
                }
                console.log('user logged !');
                const token = jwt.sign({ userId: authUser.id }, secret, options);

                res.cookie('auth_cookie', token).redirect('/');
                // create a custom cookie that will store the JWT

                // const getToken = req.cookie['auth_cookie'] || sessionStorage.getItem('auth_cookie');
                //
                // const decodedToken = jwt.verify(getToken, secret);
                //
                // console.log(decodedToken); // { _id: ..., username: ... }

            }).catch(next);
        } else {
            console.log('User not found !');
            return;
        }
    });


}

function getRegister(req, res) {
    res.render('register', { title: 'Register now for free', layout: 'register' });
}

function postRegister(req, res) {
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        res.render('register.hbs', {
            errors: {
                repeatPassword: 'Password and repeat password don\'t match!'
            }
        });
        return;
    }

    return userModel.create({ username, password }).then(() => {
        res.redirect('/login');
    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.render('register.hbs', {
                errors: {
                    username: 'Username already taken!'
                }
            });
            return;
        }
        next(err);
    });
}

function logout(req, res) {
    res.clearCookie('auth_cookie');
    res.redirect('/');
}

module.exports = {
    authenticateRoute,
    auth,
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    logout
};