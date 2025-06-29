// Place a new order
app.post('/api/orders', async (req, res) => {
    const { items } = req.body; // [{ dish, qty }, ...]
    const total = items.reduce((sum, it) => sum + it.qty * it.dish.price, 0);
    const order = new Order({ items, total });
    const saved = await order.save();
    res.status(201).json(saved);
  });
  
  // Get all orders
  app.get('/api/orders', async (req, res) => {
    const orders = await Order.find().populate('items.dish');
    res.json(orders);
  });
  