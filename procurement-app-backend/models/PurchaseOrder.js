const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
    orderNo: {
        type: Number,
        required: true,
        unique: true,
        autoIncrement: true,
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true,
    },
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
                required: true,
            },
            stockUnit: {
                type: String,
                required: true,
            },
            unitPrice: {
                type: Number,
                required: true,
            },
            packingUnit: {
                type: String,
                required: true,
                enum: ['Piece', 'Box', 'Kg', 'Liter'], // Add more units if necessary
            },
            orderQty: {
                type: Number,
                required: true,
            },
            itemAmount: {
                type: Number,
                required: true,
            },
            discount: {
                type: Number,
                default: 0,
            },
            netAmount: {
                type: Number,
                required: true,
            }
        }
    ],
    itemTotal: {
        type: Number,
        required: true,
        default: 0,
    },
    discountTotal: {
        type: Number,
        required: true,
        default: 0,
    },
    netAmountTotal: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;
