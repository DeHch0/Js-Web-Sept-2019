const jwt = require('./jwt');
const models = require('../models');

function auth(redirectUnauthenticated = true) {
    return function(req, res, next) {
        const token = req.cookies['auth_cookie'] || '';

        jwt.verifyToken(token)
            .then((data) => {
                models.userSchema.findById(data.id).then(user => {
                    req.user = user;
                    next();
                });
            }).catch(err => {

                res.redirect('/login');

                next(err);
            });
    };
}

module.exports = auth