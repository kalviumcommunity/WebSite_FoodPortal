const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [
        {
            dish: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dish', 
                required: true
            },
            qty: {
                type: Number,
                required: true,
                min: 1 
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now 
    }
});

cartSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;