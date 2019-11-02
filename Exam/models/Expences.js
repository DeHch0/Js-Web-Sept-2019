const mongoose = require('mongoose');
const { dateFormatter } = require('../utils');


const expencesSchema = new mongoose.Schema({

    merchant: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    date: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: new Date(),
    },
    total: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    category: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true,
        minlength: 10,
        maxlength: 50,
    },
    report: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        defaultValue: false,
    },
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User',
    },

});

module.exports = mongoose.model('Expences', expencesSchema);