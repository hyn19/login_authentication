const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000; // Or any port you prefer

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Pardhiv', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
// Define a schema for your data
const ratingSchema = new mongoose.Schema({
  stars: Number,
  text: String
});

// Create a model based on the schema
const Rating = mongoose.model('Rating', ratingSchema);

app.use(bodyParser.json());

// Define your API endpoints
// Example: Create a new rating
app.post('/api/ratings', async (req, res) => {
  try {
    const { stars, text } = req.body;
    const newRating = new Rating({ stars, text });
    await newRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example: Get all ratings
app.get('/api/ratings', async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
