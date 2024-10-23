const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const ExcelJS = require('exceljs');
//const upload = multer({ storage: multer.memoryStorage() });
const User = require('./models/User');
const app = express();
const port = process.env.PORT || 4000;
const events = require('events');
const { log } = require('console');
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
const REQUIRED_HEADERS = ['Region', 'Country', 'Location-Code','Entity','GB','Local-ITL','Local-ITL Proxy','Department Head (DH)','Department','Building','Floor','Lab No','Cost Center','Kind of Lab','Purpose of Lab in Brief',
  'Description', 'ACL Required', 'Is lab going to procure new equipment for Engineering/Red Zone?','Shared Lab',
];


const REQUIRED_FIELDS = [
  'Region', 'Country','Location-Code', 'Entity','GB','Local-ITL','Local-ITL Proxy','Department Head (DH)','Department','Building','Floor','Lab No','Cost Center','Kind of Lab','Purpose of Lab in Brief',
  'Description', 'ACL Required', 'Is lab going to procure new equipment for Engineering/Red Zone?','Shared Lab'// Add fields that must not be empty
];

app.post('/upload-excel', upload.single('file'), async (req, res) => {
  if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(req.file.buffer);
      const worksheet = workbook.getWorksheet(1); // Get the first worksheet

      if (!worksheet) {
          return res.status(400).json({ error: 'Worksheet not found' });
      }

      // Get the first row to use as headers
      const headerRow = worksheet.getRow(1);
      const headers = headerRow.values && Array.isArray(headerRow.values) ? headerRow.values.slice(1) : [];

      if (headers.length === 0) {
          return res.status(400).json({ error: 'No headers found' });
      }

      // Check for missing required headers
      const missingHeaders = REQUIRED_HEADERS.filter(header => !headers.includes(header));
      if (missingHeaders.length > 0) {
          return res.status(400).json({ error: 'Missing headers', missingHeaders });
      }

      const items = [];
      const validationErrors = [];

      worksheet.eachRow({ includeEmpty: false, from: 2 }, (row) => {
          const rowData = {};
          headers.forEach((header, index) => {
              if (header) {
                  rowData[header] = row.values[index + 1] || null; // `index + 1` because `row.values` is 1-based index
              }
          });

          // Check for required fields
          const missingFields = REQUIRED_FIELDS.filter(field => !rowData[field]);
          if (missingFields.length > 0) {
              validationErrors.push({ row: row.number, missingFields });
          } else {
              items.push({ ...rowData, approvalStatus: 'Pending' }); // Set initial approval status
          }
      });

      // If there are validation errors, respond with them
      if (validationErrors.length > 0) {
          return res.status(400).json({ error: 'Validation errors', validationErrors });
      }

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


// Endpoint to get GB options
app.get('/api/gb-options', async (req, res) => {
  try {
    const gbOptions = await Item.distinct('GB'); // Fetch unique GB values
    res.json(gbOptions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching GB options');
  }
});

// Endpoint to get KAM suggestions based on selected GB
app.get('/api/kam-suggestions', async (req, res) => {
  const gbValue = req.query.gb;

  try {
    const items = await Item.find({ GB: gbValue }, { "Key Account Manager (KAM)": 1, _id: 0 });
    const kamSuggestions = [...new Set(items.map(item => item["Key Account Manager (KAM)"]))]; // Unique KAM values
    res.json(kamSuggestions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching KAM suggestions');
  }
});

app.get('/api/department-suggestions', async (req, res) => {
  const gbValue = req.query.gb;

  try {
    const items = await Item.find({ GB: gbValue }, { Department: 1, _id: 0 });
    const departmentSuggestions = [...new Set(items.map(item => item.Department))]; // Unique department values
    res.json(departmentSuggestions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching department suggestions');
  }
});

// Endpoint to get Department Head suggestions based on selected Department
app.get('/api/dh-suggestions', async (req, res) => {
  const departmentValue = req.query.department;

  try {
    const items = await Item.find({ Department: departmentValue }, { "Department Head (DH)": 1, _id: 0 });
    const dhSuggestions = [...new Set(items.map(item => item["Department Head (DH)"]))]; // Unique DH values
    res.json(dhSuggestions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching DH suggestions');
  }
});

