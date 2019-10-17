const mongoose = require('mongoose');

const cubesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    imageUrl: String,
    difficulty: Number,
    accessories: [{ type: mongoose.Types.ObjectId, ref: 'accessors' }],
    creator: { type: mongoose.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('cube', cubesSchema);