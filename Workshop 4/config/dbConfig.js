const dbUrl = 'mongodb://localhost:27017/cube';
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(dbUrl , {useNewUrlParser: true}, console.log('DB is ready!'));
};