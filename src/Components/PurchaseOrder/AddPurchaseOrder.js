// src/Components/PurchaseOrder/AddPurchaseOrder.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddPurchaseOrder.css'; // Create and style this file accordingly

const AddPurchaseOrder = () => {
    const [supplier, setSupplier] = useState('');
    const [items, setItems] = useState([{ item: '', orderQty: 0, unitPrice: 0, discount: 0 }]);

    const handleAddItem = () => {
        setItems([...items, { item: '', orderQty: 0, unitPrice: 0, discount: 0 }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newOrder = { supplier, items };
        try {
            await axios.post('/api/purchase-orders', newOrder);
            alert('Purchase order created successfully!');
        } catch (error) {
            console.error(error);
            alert('Error creating purchase order!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="purchase-order-form">
            <h2>Add Purchase Order</h2>
            <div>
                <label>Supplier</label>
                <input type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} required />
            </div>
            {items.map((item, index) => (
                <div key={index} className="item-container">
                    <label>Item {index + 1}</label>
                    <input type="text" placeholder="Item Name" value={item.item} onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].item = e.target.value;
                        setItems(newItems);
                    }} required />
                    <input type="number" placeholder="Order Qty" value={item.orderQty} onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].orderQty = e.target.value;
                        setItems(newItems);
                    }} required />
                    <input type="number" placeholder="Unit Price" value={item.unitPrice} onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].unitPrice = e.target.value;
                        setItems(newItems);
                    }} required />
                    <input type="number" placeholder="Discount" value={item.discount} onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].discount = e.target.value;
                        setItems(newItems);
                    }} />
                </div>
            ))}
            <button type="button" onClick={handleAddItem}>Add Item</button>
            <button type="submit">Submit Order</button>
        </form>
    );
};

export default AddPurchaseOrder;
