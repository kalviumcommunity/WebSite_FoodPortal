require('dotenv').config(); // Ensure this is at the top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('MONGO_URI:', process.env.MONGO_URI); // Debugging output

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));