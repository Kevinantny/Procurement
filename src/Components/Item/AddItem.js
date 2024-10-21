import React, { useState } from 'react';
import axios from 'axios';
import './AddItem.css';  // Your custom CSS file for styling
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';  // Import CSS for toast notifications

const AddItem = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        description: '',
        quantity: 0,
        stockUnit: '',
        unitPrice: 0,
        supplier: '',
        category: '',
        brand: '',
        inventoryLocation: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/items', formData);
            console.log('Item added successfully', response.data);
            toast.success('Item added successfully!');
            setFormData({
                itemName: '',
                description: '',
                quantity: 0,
                stockUnit: '',
                unitPrice: 0,
                supplier: '',
                category: '',
                brand: '',
                inventoryLocation: ''
            });  // Reset form
        } catch (error) {
            console.error('Error adding item:', error.response?.data?.message || error.message);
            toast.error('Failed to add item, please try again.');
        }
    };

    return (
        <div className="add-item-container">
            <form onSubmit={handleSubmit}>
                <input type="text" name="itemName" onChange={handleChange} value={formData.itemName} placeholder="Item Name" />
                <input type="text" name="description" onChange={handleChange} value={formData.description} placeholder="Description" />
                <input type="number" name="quantity" onChange={handleChange} value={formData.quantity} placeholder="Quantity" />
                <input type="text" name="stockUnit" onChange={handleChange} value={formData.stockUnit} placeholder="Stock Unit" />
                <input type="number" name="unitPrice" onChange={handleChange} value={formData.unitPrice} placeholder="Unit Price" />
                <input type="text" name="supplier" onChange={handleChange} value={formData.supplier} placeholder="Supplier ID" />
                <input type="text" name="category" onChange={handleChange} value={formData.category} placeholder="Category" />
                <input type="text" name="brand" onChange={handleChange} value={formData.brand} placeholder="Brand" />
                <input type="text" name="inventoryLocation" onChange={handleChange} value={formData.inventoryLocation} placeholder="Inventory Location" />
                <button type="submit">Add Item</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddItem;
