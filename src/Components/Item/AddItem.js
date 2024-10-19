// src/Components/Item/AddItem.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddItem.css'; // Create this CSS file for styling

const AddItem = () => {
    const [itemName, setItemName] = useState('');
    const [unitPrice, setUnitPrice] = useState(0);
    const [inventoryLocation, setInventoryLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newItem = {
                itemName,
                unitPrice,
                inventoryLocation,
            };
            await axios.post('/api/items', newItem);
            alert('Item added successfully!');
            // Optionally reset the form or redirect
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item. Please try again.');
        }
    };

    return (
        <div className="add-item">
            <h2>Add Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Item Name:</label>
                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Unit Price:</label>
                    <input
                        type="number"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Inventory Location:</label>
                    <input
                        type="text"
                        value={inventoryLocation}
                        onChange={(e) => setInventoryLocation(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddItem;
