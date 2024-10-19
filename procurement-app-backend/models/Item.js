const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemNo: {
        type: Number,
        required: true,
        unique: true,
        autoIncrement: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    inventoryLocation: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true,
    },
    stockUnit: {
        type: String,
        required: true,
        enum: ['Piece', 'Box', 'Kg', 'Liter'], // Add more units as necessary
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    itemImages: [
        {
            imageUrl: { type: String },
            imageAlt: { type: String }
        }
    ],
    status: {
        type: String,
        enum: ['Enabled', 'Disabled'],
        default: 'Enabled',
    }
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
