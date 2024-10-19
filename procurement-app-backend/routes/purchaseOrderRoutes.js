const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../models/PurchaseOrder');
const Supplier = require('../models/Supplier');
const Item = require('../models/Item');

// @desc    Create a new purchase order
// @route   POST /api/purchase-orders
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { supplier, items } = req.body;

        // Generate order number
        const lastOrder = await PurchaseOrder.findOne().sort({ orderNo: -1 });
        const orderNo = lastOrder ? lastOrder.orderNo + 1 : 1;

        // Calculate totals
        let itemTotal = 0;
        let discountTotal = 0;
        let netAmountTotal = 0;

        items.forEach((item) => {
            item.itemAmount = item.orderQty * item.unitPrice;
            item.netAmount = item.itemAmount - item.discount;
            itemTotal += item.itemAmount;
            discountTotal += item.discount;
            netAmountTotal += item.netAmount;
        });

        const newOrder = new PurchaseOrder({
            orderNo,
            supplier,
            items,
            itemTotal,
            discountTotal,
            netAmountTotal,
        });

        const createdOrder = await newOrder.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all purchase orders
// @route   GET /api/purchase-orders
// @access  Public
router.get('/', async (req, res) => {
    try {
        const orders = await PurchaseOrder.find({}).populate('supplier', 'supplierName').populate('items.item', 'itemName');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get a single purchase order by ID
// @route   GET /api/purchase-orders/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const order = await PurchaseOrder.findById(req.params.id)
            .populate('supplier', 'supplierName') // Populating supplier name
            .populate('items.item', 'itemName'); // Populating item name
        if (!order) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete a purchase order by ID
// @route   DELETE /api/purchase-orders/:id
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findById(req.params.id);

        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }

        // Use findByIdAndDelete to delete the purchase order
        await PurchaseOrder.findByIdAndDelete(req.params.id);
        res.json({ message: 'Purchase order removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
