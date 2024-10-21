const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');  // Import cors

const supplierRoutes = require('./routes/supplierRoutes'); // Import supplier routes
const itemRoutes = require('./routes/itemRoutes');
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');

// Load environment variables
dotenv.config();  

// Initialize express app
const app = express();

// Use CORS middleware before any route definitions
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB
connectDB();

// Supplier routes
app.use('/api/suppliers', supplierRoutes);

// Item routes
app.use('/api/items', itemRoutes);

// Purchase Order routes
app.use('/api/purchase-orders', purchaseOrderRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
