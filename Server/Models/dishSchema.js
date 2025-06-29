const dishSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    image: String,
    description: String,
  });
  
  const Dish = mongoose.model('Dish', dishSchema);
  