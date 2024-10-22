const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    supplierNo: { type: Number, required: true, unique: true },
    supplierName: { type: String, required: true },
    address: { type: String },
    taxNo: { type: String },
    country: { type: String },
    mobileNo: { type: String },
    email: { type: String },
    status: { type: String, default: 'Active' }, 
});

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;
