const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; // or any port you prefer

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ITLWorkflow', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define routes and start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Check MongoDB connection status
if (mongoose.connection.readyState === 1) {
  console.log('MongoDB is connected');
} else {
  console.log('MongoDB is not connected');
}
