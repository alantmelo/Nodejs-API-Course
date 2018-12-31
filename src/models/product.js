'user strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: [true, 'Titulo obrigatorio'],
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'Slug obrigatorio'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Descrição obrigatoria'],
        trim: true

    },
    price: {
        type: Number,
        required: [true, 'Preco obrigatorio']
    },
    active: {
        type: Boolean,
        default: true
    },
    tags: [{
        type: String,
        required: [true, 'tags obrigatorias']
    }],
    image: {
        type: String,
        required: true,
        trim: true
    },
});

module.exports = mongoose.model('Product', schema);