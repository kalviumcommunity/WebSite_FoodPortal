const express = require('express');
const router = express.Router();
const Cart = require('../models/cart'); 

router.post('/api/cart', async (req, res) => {
    try {
        const cart = req.body;

        if (!cart || !Array.isArray(cart)) {
            return res.status(400).json({ error: 'Cart must be an array of items' });
        }

        const newCart = new Cart({ items: cart });
        const savedCart = await newCart.save();

        res.status(201).json({ success: true, message: 'Cart data saved successfully', cart: savedCart });
    } catch (error) {
        console.error('Error saving cart data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT API to update cart data
router.put('/api/cart/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get cart ID from the URL
        const cart = req.body;

        if (!cart || !Array.isArray(cart)) {
            return res.status(400).json({ error: 'Cart must be an array of items' });
        }

        const updatedCart = await Cart.findByIdAndUpdate(
            id,
            { items: cart },
            { new: true } 
        );

        if (!updatedCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json({ success: true, message: 'Cart data updated successfully', cart: updatedCart });
    } catch (error) {
        console.error('Error updating cart data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/api/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await Cart.findById(id).populate('items.dish');

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error('Error fetching cart:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;