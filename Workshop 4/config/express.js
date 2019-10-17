const express = require('express');
const bodyParser = require('body-parser');

module.exports = (app) => {
    const path = require('path');
    const hbs = require('express-handlebars');
    const cookieParser = require('cookie-parser');
    const userSchema = require('../models/User');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    // const app =express();

    app.use(cookieParser());

    // app.use(bodyParser.urlencoded(true));

    const options = { expiresIn: '2d' };
    const secret = 'MySuperPrivateSecret';

    app.engine('hbs', hbs({
        extname: 'hbs',
        defaultLayout: 'index.hbs',
        partialsDir: './views/partials/',
        layoutsDir: './views'
    }));

    app.set('views', path.normalize(path.join(__dirname, '../views')));
    app.set('css', path.join(__dirname, 'static', 'css'));
    app.set('view engine', 'hbs');
    app.use(express.static(path.normalize(__dirname)));
    app.use(express.static(path.normalize(path.join(__dirname, '../static'))));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser())

};