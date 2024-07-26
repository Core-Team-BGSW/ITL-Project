



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ITLWorkflow', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a simple model
const Item = mongoose.model('Item', new mongoose.Schema({
  Location: String,
  Sl: { no: Number },

}));

// Define routes
app.get('/Lablist', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});


// DELETE endpoint
app.delete('/Lablist/:id', async (req, res) => {
  try {
    const result = await Item.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).json({ message: 'Lab removed successfully' });
    } else {
      res.status(404).json({ message: 'Lab not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

app.post('/Lablist', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
