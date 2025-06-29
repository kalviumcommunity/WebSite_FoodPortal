// POST API for handling cart data
router.post('/api/cart', (req, res) => {
    const cart = req.body; // Expecting an array of cart items

    if (!cart || !Array.isArray(cart)) {
        return res.status(400).json({ error: 'Cart must be an array of items' });
    }

    // Simulate saving or processing cart data (replace with actual database logic)
    console.log('Received cart data:', cart);

    res.status(201).json({ success: true, message: 'Cart data processed successfully', cart });
});

module.exports = router;