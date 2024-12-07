const mongoose = require('mongoose');
const Equipment = require('./models/Equipment');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected for sample data insertion');
  insertSampleData();
})
.catch(err => console.error('MongoDB connection error:', err));

const insertSampleData = async () => {
  const sampleEquipment = [
    { name: 'Tractor', type: 'Vehicle', specifications: 'Model X, 100HP', rentalCost: 150 },
    { name: 'Plow', type: 'Tool', specifications: 'Steel, 3 blades', rentalCost: 50 },
    { name: 'Harvester', type: 'Machine', specifications: 'Model Y, 200HP', rentalCost: 250 },
  ];

  try {
    await Equipment.insertMany(sampleEquipment);
    console.log('Sample equipment data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    mongoose.connection.close();
  }
};
