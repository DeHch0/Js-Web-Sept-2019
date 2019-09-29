const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('express-handlebars');

module.exports = (app) => {

    app.engine('hbs', hbs({extname: 'hbs' , defaultLayout: 'index.hbs' , layoutsDir: './views'}));

    app.set('views' , path.normalize(path.join(__dirname, '../views')));
    app.set('css' , path.join(__dirname, 'static' , 'css'));
    app.set('view engine' , 'hbs' );

    app.use(express.static(path.normalize(__dirname)));
    app.use(express.static(path.normalize(path.join(__dirname , '../static'))));
    app.use(bodyParser.urlencoded({extended: true}));

};