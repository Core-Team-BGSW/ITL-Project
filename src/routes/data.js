// routes/data.js

const express = require('express');
const router = express.Router();
const Data = require('../models/Data'); // Example Mongoose model

// GET all data
router.get('/data', (req, res) => {
  Data.find()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST new data
router.post('/data', (req, res) => {
  const newData = new Data(req.body);
  newData.save()
    .then(data => res.status(201).json(data))
    .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
