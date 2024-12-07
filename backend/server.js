const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const session = require('express-session');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB', err);
    return;
  }
  console.log('Connected to MongoDB');
  const db = client.db('farmEquipmentRental');
  const usersCollection = db.collection('users');

  // Register endpoint
  app.post('/register', async (req, res) => {
    console.log('Received registration request:', req.body);
    const { name, email, phone, password } = req.body;
    try {
      await usersCollection.insertOne({ name, email, phone, password });
      res.status(201).send('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Error registering user');
    }
  });

  // Login endpoint
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await usersCollection.findOne({ email, password });
      if (user) {
        req.session.user = user; // Store user in session
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      res.status(500).send('Error logging in');
    }
  });

  // Equipment endpoint
  app.get('/equipment', async (req, res) => {
    try {
      const equipment = await db.collection('equipment').find().toArray();
      res.status(200).json(equipment);
    } catch (error) {
      console.error('Error fetching equipment:', error);
      res.status(500).send('Error fetching equipment');
    }
  });

  // Rent equipment endpoint
  app.post('/rent', async (req, res) => {
    const { equipmentId, userId } = req.body;
    try {
      // Logic to handle the rental process
      // Example: Update equipment status, log the rental, etc.
      res.status(200).send('Equipment rented successfully');
    } catch (error) {
      console.error('Error renting equipment:', error);
      res.status(500).send('Error renting equipment');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
