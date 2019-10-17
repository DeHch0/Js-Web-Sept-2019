const userController = require('../controllers/userController');

function about(req, res) {

    res.render('about', { layout: 'about' })

}



module.exports = {
    about
};