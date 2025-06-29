router.post('/api/cart', (req, res) => {
    const cart = req.body; 

    if (!cart || !Array.isArray(cart)) {
        return res.status(400).json({ error: 'Cart must be an array of items' });
    }

    console.log('Received cart data:', cart);

    res.status(201).json({ success: true, message: 'Cart data processed successfully', cart });
});


router.put('/api/cart', (req, res) => {
    const cart = req.body; 

    if (!cart || !Array.isArray(cart)) {
        return res.status(400).json({ error: 'Cart must be an array of items' });
    }

    console.log('Updated cart data:', cart);

    res.status(200).json({ success: true, message: 'Cart data updated successfully', cart });
});



module.exports = router;