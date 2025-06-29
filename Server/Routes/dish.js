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
  app.post('/api/dishes', async (req, res) => {
    const newDish = new Dish(req.body);
    const saved = await newDish.save();
    res.status(201).json(saved);
  });
  