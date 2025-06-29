// Get all dishes or filter by search/category
app.get('/api/dishes', async (req, res) => {
    const { q, category } = req.query;
    const filter = {};
    if (q) filter.name = new RegExp(q, 'i');
    if (category) filter.category = category;
    const dishes = await Dish.find(filter);
    res.json(dishes);
  });
  
  // Get a single dish
  app.get('/api/dishes/:id', async (req, res) => {
    const dish = await Dish.findById(req.params.id);
    res.json(dish);
  });
  
  // Create a new dish (admin use)
  router.post('/api/dishes', async (req, res) => {
    try {
        const { name, category, price, description } = req.body;

        // Validate required fields
        if (!name || !category || !price) {
            return res.status(400).json({ error: 'Name, category, and price are required' });
        }

        // Create a new dish
        const newDish = new Dish({ name, category, price, description });
        const savedDish = await newDish.save();

        res.status(201).json({ success: true, message: 'Dish created successfully', dish: savedDish });
    } catch (error) {
        console.error('Error creating dish:', error.message);
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

module.exports = router;