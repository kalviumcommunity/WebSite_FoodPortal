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

module.exports = router;