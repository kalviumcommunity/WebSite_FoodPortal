// Optional: Save cart server-side
app.post('/api/cart', (req, res) => {
    const cart = req.body; // items array
    // save or process...
    res.json({ success: true, cart });
  });

  