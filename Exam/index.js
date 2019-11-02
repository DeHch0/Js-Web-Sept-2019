const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/dbConfig')();
require('./config/routes')(app);


app.use((req, res, next) => {
    res.locals.isLogged = res.cookie['auth-cookie'] ? true : false;
    res.locals.username = res.cookie['username'];
    next()
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}! Now its up to you...`);
});