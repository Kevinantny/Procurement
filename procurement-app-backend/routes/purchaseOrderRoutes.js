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
        console.log('Request Body:', req.body); // Log the incoming request body

        const { supplier, items } = req.body;

        // Validate supplier and items
        if (!supplier || !items || items.length === 0) {
            return res.status(400).json({ message: 'Supplier and items are required' });
        }

        // Calculate totals
        let itemTotal = 0;
        let discountTotal = 0;
        let netAmountTotal = 0;

        // Process each item
        for (const item of items) {
            const { orderQty, unitPrice, discount } = item;

            // Validate required fields
            if (!item.item || !orderQty || !unitPrice) {
                return res.status(400).json({ message: 'Item, order quantity, and unit price are required' });
            }

            const itemAmount = orderQty * unitPrice;
            const netAmount = itemAmount - discount;

            item.itemAmount = itemAmount; // Set item amount
            item.netAmount = netAmount; // Set net amount

            itemTotal += itemAmount;
            discountTotal += discount;
            netAmountTotal += netAmount;
        }

        // Create new purchase order
        const newOrder = new PurchaseOrder({
            supplier,
            items,
            itemTotal,
            discountTotal,
            netAmountTotal,
        });

        const createdOrder = await newOrder.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('Error creating purchase order:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
