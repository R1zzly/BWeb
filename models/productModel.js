let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    imageURL: String,
    price:  Number
});
module.exports = new mongoose.model('products', schema);