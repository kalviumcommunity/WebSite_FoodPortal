const express = require('express');
const router = express.Router();
const Order = require('../Models/Order'); 
router.post('/api/orders', async (req, res) => {
    try {
        const { items } = req.body; 

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Items must be a non-empty array' });
        }

        const total = items.reduce((sum, it) => sum + it.qty * it.dish.price, 0);

        const order = new Order({ items, total });
        const savedOrder = await order.save();

        res.status(201).json({ success: true, message: 'Order placed successfully', order: savedOrder });
    } catch (error) {
        console.error('Error placing order:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.put('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const { items } = req.body; 

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Items must be a non-empty array' });
        }

        const total = items.reduce((sum, it) => sum + it.qty * it.dish.price, 0);

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { items, total },
            { new: true } 
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ success: true, message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        console.error('Error updating order:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('items.dish');
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id).populate('cart');

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error('Error fetching order:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;