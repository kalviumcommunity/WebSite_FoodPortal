const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
        trim: true, // Removes whitespace from the beginning and end
    },
    category: {
        type: String,
        required: true, // Category is required
    },
    price: {
        type: Number,
        required: true, // Price is required
        min: 0, // Price must be non-negative
    },
    image: {
        type: String, // URL for the dish image
        default: '', // Default value if no image is provided
    },
    description: {
        type: String,
        trim: true, // Removes whitespace from the beginning and end
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets the creation date
    },
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;