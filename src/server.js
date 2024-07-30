


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
// const Item = mongoose.model('Item', new mongoose.Schema({
//   Location: String,
//   Sl: { no: Number },

// }));

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

// app.post('/Lablist', async (req, res) => {
//   const newItem = new Item(req.body);
//   await newItem.save();
//   res.json(newItem);
// });

// app.post('/Lablist', async (req, res) => {
//   try {
//     const lab = new Lab(req.body);
//     await lab.save();
//     res.status(201).send(lab);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

app.post('/Lablist', async (req, res) => {
  try {
    const formData = req.body;
    const item  = new Item(formData);
    await item .save();
    res.status(201).json(item);
  } catch (error) {
    console.error('Error saving data:', error); // Log the error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


const itemSchema = new mongoose.Schema({
  Region: String,
  Country: String,
  Location: String,
  "Location-Code": String,
  Entity: String,
  GB: String,
 "Local-ITL": String,
  "Local-ITL Proxy": String,
  "Department Head (DH)": String,
  "Key Account Manager (KAM)": String,
  Department: String,
  Building: String,
  Floor: String,
  "Lab No.": String,
  "Primary Lab Coordinator": String,
  "Secondary Lab Coordinator": String,
  "Cost Center": String,
  "Kind of Lab": String,
  "Purpose of Lab in Brief": String,
  Description : String,
  // ACL: String,
  "No. of Green Ports": String,
  "No. of Yellow Ports": String,
  "No. of Red Ports": String,
  "Is lab going to procure new equipment for Engineering/Red Zone?": String,
  "Shared Lab": String,
  "ACL Required": String,
  otherLabType: String
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
