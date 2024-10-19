// const express = require('express');
// const router = express.Router();
// const Supplier = require('../models/Supplier');

// // @desc    Create new supplier
// // @route   POST /api/suppliers
// // @access  Public (or Protected if you plan to implement authentication)
// router.post('/', async (req, res) => {
//     try {
//         const { supplierName, address, taxNo, country, mobileNo, email, status } = req.body;

//         // Generate supplier number
//         const lastSupplier = await Supplier.findOne().sort({ supplierNo: -1 });
//         const supplierNo = lastSupplier ? lastSupplier.supplierNo + 1 : 1;

//         const supplier = new Supplier({
//             supplierNo,
//             supplierName,
//             address,
//             taxNo,
//             country,
//             mobileNo,
//             email,
//             status,
//         });

//         const createdSupplier = await supplier.save();
//         res.status(201).json(createdSupplier);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // @desc    Fetch all suppliers
// // @route   GET /api/suppliers
// // @access  Public
// router.get('/', async (req, res) => {
//     try {
//         const suppliers = await Supplier.find({});
//         res.json(suppliers);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // @desc    Fetch a single supplier by ID
// // @route   GET /api/suppliers/:id
// // @access  Public
// router.get('/:id', async (req, res) => {
//     try {
//         const supplier = await Supplier.findById(req.params.id);
//         if (!supplier) {
//             return res.status(404).json({ message: 'Supplier not found' });
//         }
//         res.json(supplier);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // @desc    Update supplier
// // @route   PUT /api/suppliers/:id
// // @access  Public (or Protected)
// router.put('/:id', async (req, res) => {
//     try {
//         const supplier = await Supplier.findById(req.params.id);
//         if (!supplier) {
//             return res.status(404).json({ message: 'Supplier not found' });
//         }

//         const { supplierName, address, taxNo, country, mobileNo, email, status } = req.body;

//         supplier.supplierName = supplierName || supplier.supplierName;
//         supplier.address = address || supplier.address;
//         supplier.taxNo = taxNo || supplier.taxNo;
//         supplier.country = country || supplier.country;
//         supplier.mobileNo = mobileNo || supplier.mobileNo;
//         supplier.email = email || supplier.email;
//         supplier.status = status || supplier.status;

//         const updatedSupplier = await supplier.save();
//         res.json(updatedSupplier);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // @desc    Delete supplier
// // @route   DELETE /api/suppliers/:id
// // @access  Public (or Protected)
// router.delete('/:id', async (req, res) => {
//     try {
//         const supplier = await Supplier.findById(req.params.id);
//         if (!supplier) {
//             return res.status(404).json({ message: 'Supplier not found' });
//         }

//         await supplier.deleteOne();
//         res.json({ message: 'Supplier removed' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// @desc    Create new supplier
// @route   POST /api/suppliers
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { supplierName, address, taxNo, country, mobileNo, email, status } = req.body;

        // Generate supplier number
        const lastSupplier = await Supplier.findOne().sort({ supplierNo: -1 });
        const supplierNo = lastSupplier ? lastSupplier.supplierNo + 1 : 1;

        const supplier = new Supplier({
            supplierNo,
            supplierName,
            address,
            taxNo,
            country,
            mobileNo,
            email,
            status,
        });

        const createdSupplier = await supplier.save();
        res.status(201).json(createdSupplier);
    } catch (error) {
        console.error("Error creating supplier:", error);
        res.status(500).json({ message: 'Error creating supplier', error: error.message });
    }
});

// @desc    Fetch all suppliers
// @route   GET /api/suppliers
// @access  Public
router.get('/', async (req, res) => {
    try {
        const suppliers = await Supplier.find({});
        res.json(suppliers);
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        res.status(500).json({ message: 'Error fetching suppliers', error: error.message });
    }
});

// @desc    Fetch a single supplier by ID
// @route   GET /api/suppliers/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(supplier);
    } catch (error) {
        console.error("Error fetching supplier by ID:", error);
        res.status(500).json({ message: 'Error fetching supplier', error: error.message });
    }
});

// @desc    Update supplier
// @route   PUT /api/suppliers/:id
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        const { supplierName, address, taxNo, country, mobileNo, email, status } = req.body;

        supplier.supplierName = supplierName || supplier.supplierName;
        supplier.address = address || supplier.address;
        supplier.taxNo = taxNo || supplier.taxNo;
        supplier.country = country || supplier.country;
        supplier.mobileNo = mobileNo || supplier.mobileNo;
        supplier.email = email || supplier.email;
        supplier.status = status || supplier.status;

        const updatedSupplier = await supplier.save();
        res.json(updatedSupplier);
    } catch (error) {
        console.error("Error updating supplier:", error);
        res.status(500).json({ message: 'Error updating supplier', error: error.message });
    }
});

// @desc    Delete supplier
// @route   DELETE /api/suppliers/:id
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        await supplier.deleteOne();
        res.json({ message: 'Supplier removed' });
    } catch (error) {
        console.error("Error deleting supplier:", error);
        res.status(500).json({ message: 'Error deleting supplier', error: error.message });
    }
});

module.exports = router;
