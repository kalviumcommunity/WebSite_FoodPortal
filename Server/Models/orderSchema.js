
const orderSchema = new mongoose.Schema({
    items: [{ dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }, qty: Number }],
    total: Number,
    createdAt: { type: Date, default: Date.now },
  });
  
  const Order = mongoose.model('Order', orderSchema);