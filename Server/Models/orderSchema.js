const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
    total: {
        type: Number,
        required: true,
        min: 0 
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'], 
        default: 'Pending' 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now 
    }
});

orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;