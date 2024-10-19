const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const supplierRoutes = require('./routes/supplierRoutes'); // Import supplier routes
const itemRoutes = require('./routes/itemRoutes');
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');



dotenv.config();  // Load environment variables

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB
connectDB();

// Supplier routes
app.use('/api/suppliers', supplierRoutes);
// Item routes
app.use('/api/items', itemRoutes);
//purchaseOrderRoutes
app.use('/api/purchase-orders', purchaseOrderRoutes);


app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
