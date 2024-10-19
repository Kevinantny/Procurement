const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Supplier = require('../models/Supplier');

// @desc    Create a new item
// @route   POST /api/items
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { itemName, inventoryLocation, brand, category, supplier, stockUnit, unitPrice, itemImages, status } = req.body;

        // Generate item number
        const lastItem = await Item.findOne().sort({ itemNo: -1 });
        const itemNo = lastItem ? lastItem.itemNo + 1 : 1;

        const newItem = new Item({
            itemNo,
            itemName,
            inventoryLocation,
            brand,
            category,
            supplier,
            stockUnit,
            unitPrice,
            itemImages,
            status,
        });

        const createdItem = await newItem.save();
        res.status(201).json(createdItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all items
// @route   GET /api/items
// @access  Public
router.get('/', async (req, res) => {
    try {
        const items = await Item.find({}).populate('supplier', 'supplierName');
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get a single item by ID
// @route   GET /api/items/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('supplier', 'supplierName');
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const { itemName, inventoryLocation, brand, category, supplier, stockUnit, unitPrice, itemImages, status } = req.body;
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.itemName = itemName || item.itemName;
        item.inventoryLocation = inventoryLocation || item.inventoryLocation;
        item.brand = brand || item.brand;
        item.category = category || item.category;
        item.supplier = supplier || item.supplier;
        item.stockUnit = stockUnit || item.stockUnit;
        item.unitPrice = unitPrice || item.unitPrice;
        item.itemImages = itemImages || item.itemImages;
        item.status = status || item.status;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await item.deleteOne();
        res.json({ message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
