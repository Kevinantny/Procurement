
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Importing the xlsx library
import './AddPurchaseOrder.css'; // Include the CSS file for styling

const AddPurchaseOrder = () => {
    const [supplier, setSupplier] = useState('');
    const [items, setItems] = useState([{ item: '', orderQty: 0, unitPrice: 0, discount: 0, stockUnit: '', packingUnit: 'Piece' }]);
    const [availableItems, setAvailableItems] = useState([]); // For fetching items
    const [suppliers, setSuppliers] = useState([]); // For fetching suppliers

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/api/items'); // Fetch items from your API
                setAvailableItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('/api/suppliers'); // Fetch suppliers from your API
                setSuppliers(response.data);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        fetchItems();
        fetchSuppliers();
    }, []);

    const handleAddItem = () => {
        setItems([...items, { item: '', orderQty: 0, unitPrice: 0, discount: 0, stockUnit: '', packingUnit: 'Piece' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newOrder = {
            supplier,
            items: items.map(item => ({
                item: item.item,
                orderQty: item.orderQty,
                unitPrice: item.unitPrice,
                discount: item.discount,
                stockUnit: item.stockUnit,
                packingUnit: item.packingUnit,
            })),
        };

        try {
            await axios.post('/api/purchase-orders', newOrder);
            alert('Purchase order created successfully!');
            // Optionally reset the form here
        } catch (error) {
            console.error('Error creating purchase order:', error.response ? error.response.data : error.message);
            alert('Error creating purchase order! ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(items.map(item => ({
            item: item.item,
            orderQty: item.orderQty,
            unitPrice: item.unitPrice,
            discount: item.discount,
            stockUnit: item.stockUnit,
            packingUnit: item.packingUnit,
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Purchase Order');

        // Save to file
        XLSX.writeFile(wb, 'purchase_order.xlsx');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <form onSubmit={handleSubmit} className="purchase-order-form">
            <h2>Add Purchase Order</h2>
            <div className="form-group">
                <label>Supplier (Enter Supplier ID)</label>
                <input
                    type="text"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    required
                    placeholder="Enter Supplier ID"
                />
            </div>
            {items.map((item, index) => (
                <div key={index} className="item-container">
                    <h3>Item {index + 1}</h3>
                    <div className="form-group">
                        <label>Item (Select Item ID)</label>
                        <select value={item.item} onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].item = e.target.value; // Use ObjectId
                            setItems(newItems);
                        }} required>
                            <option value="">Select an Item</option>
                            {availableItems.map(availableItem => (
                                <option key={availableItem._id} value={availableItem._id}>
                                    {availableItem.itemName} {/* Display the item's name */}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Order Quantity</label>
                        <input
                            type="number"
                            placeholder="Order Quantity"
                            value={item.orderQty}
                            onChange={(e) => {
                                const newItems = [...items];
                                newItems[index].orderQty = e.target.value;
                                setItems(newItems);
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Unit Price</label>
                        <input
                            type="number"
                            placeholder="Unit Price"
                            value={item.unitPrice}
                            onChange={(e) => {
                                const newItems = [...items];
                                newItems[index].unitPrice = e.target.value;
                                setItems(newItems);
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Discount</label>
                        <input
                            type="number"
                            placeholder="Discount"
                            value={item.discount}
                            onChange={(e) => {
                                const newItems = [...items];
                                newItems[index].discount = e.target.value;
                                setItems(newItems);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Stock Unit</label>
                        <input
                            type="text"
                            placeholder="Stock Unit"
                            value={item.stockUnit}
                            onChange={(e) => {
                                const newItems = [...items];
                                newItems[index].stockUnit = e.target.value;
                                setItems(newItems);
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Packing Unit</label>
                        <select value={item.packingUnit} onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].packingUnit = e.target.value;
                            setItems(newItems);
                        }} required>
                            <option value="Piece">Piece</option>
                            <option value="Box">Box</option>
                            <option value="Kg">Kg</option>
                            <option value="Liter">Liter</option>
                        </select>
                    </div>
                </div>
            ))}
            <button type="button" className="add-item-btn" onClick={handleAddItem}>Add Another Item</button>
            <button type="submit" className="submit-btn">Submit Order</button>
            <button type="button" className="export-btn" onClick={exportToExcel}>Export to Excel</button>
            <button type="button" className="print-btn" onClick={handlePrint}>Print Purchase Order</button>
        </form>
    );
};

export default AddPurchaseOrder;
