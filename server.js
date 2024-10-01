const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const ExcelJS = require('exceljs');
//const upload = multer({ storage: multer.memoryStorage() });
const User = require('./models/User');
const app = express();
const port = process.env.PORT || 3000;
const events = require('events');
events.EventEmitter.defaultMaxListeners = 20;


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
  try {
    const formData = req.body;
    formData.approvalStatus = 'Pending'; // Set initial approval status
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
  "Lab No": String,
  "Primary Lab Coordinator": String,
  "Secondary Lab Coordinator": String,
  "Cost Center": String,
  "Kind of Lab": String,
  "Purpose of Lab in Brief": String,
  Description : String,
  // ACL: String,
  "No of Green Ports": String,
  "No of Yellow Ports": String,
  "No of Red Ports": String,
  "Is lab going to procure new equipment for Engineering/Red Zone?": String,
  "Shared Lab": String,
  "ACL Required": String,
  "Self Audit Date": String,
  otherLabType: String,
  approvalStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  rejectionRemarks: String
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;


// Configure Multer for file upload
const upload = multer({ storage: multer.memoryStorage() });


app.post('/upload-excel', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.getWorksheet(1);

    if (!worksheet) {
      return res.status(400).json({ error: 'Worksheet not found' });
    }

    // Get the first row to use as headers
    const headerRow = worksheet.getRow(1);

    // Ensure headerRow.values is an array and has elements
    const headers = headerRow.values && Array.isArray(headerRow.values) ? headerRow.values.slice(1) : [];

    if (headers.length === 0) {
      return res.status(400).json({ error: 'No headers found' });
    }

    const items = [];

    worksheet.eachRow({ includeEmpty: false, from: 2 }, (row) => {
      const rowData = {};
      headers.forEach((header, index) => {
        if (header) {
          rowData[header] = row.values[index + 1] || null;  // `index + 1` because `row.values` is 1-based index
        }
      });

      // Skip if all values are header names
      if (Object.values(rowData).every(value => headers.includes(value))) {
        return;  // Skip this row
      }

      items.push(rowData);
      rowData.approvalStatus = 'Pending'; // Set initial approval status
    });

    console.log('Data to insert:', items); // Log data to check before insertion

    // Insert all items into the database
    await Item.insertMany(items);
    res.status(201).json({ message: 'Data successfully uploaded and saved to MongoDB' });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Route to get all pending applications
app.get('/Lablist/pending', async (req, res) => {
  try {
    const pendingItems = await Item.find({ approvalStatus: 'Pending' });
    res.status(200).json(pendingItems);
  } catch (error) {
    console.error('Error fetching pending applications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to approve an application
app.post('/Lablist/approve/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(id, { approvalStatus: 'Approved' }, { new: true });
    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (error) {
    console.error('Error approving application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/register/newuser', async (req, res) => {
  const { id, password } = req.body;

  try {
    const newUser = new User({ id, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error); // Log the error
    res.status(500).json({ error: 'Failed to register user' });
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const locationSchema = new mongoose.Schema({
  Region: String,
  Country: String,
  LocationCode: String,
});
const Location = mongoose.model('Location', locationSchema);

app.get('/api/locations', async (req, res) => {
  try {
      const locations = await Location.find({});
      res.json(locations);
  } catch (error) {
      console.error('Error fetching locations:', error);
      res.status(500).send('Internal Server Error');
  }
});


