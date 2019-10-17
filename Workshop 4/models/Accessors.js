const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    imageUrl: {type: String, required: true},
    description: {type: String , required: true},
    cubes: [{ type: mongoose.Types.ObjectId, ref: 'cube' }],
});

module.exports = mongoose.model('accessors', accessoriesSchema);