// src/Components/Supplier/AddSupplier.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddSupplier.css'; // Ensure this file exists and is styled accordingly

const AddSupplier = () => {
    const [supplierName, setSupplierName] = useState('');
    const [address, setAddress] = useState('');
    const [taxNo, setTaxNo] = useState('');
    const [country, setCountry] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Active');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/suppliers', {
                supplierName,
                address,
                taxNo,
                country,
                mobileNo,
                email,
                status,
            });
            alert('Supplier added successfully!');
            console.log("helllo", response.data); // Debug response
        } catch (error) {
            console.error("Error adding supplier:", error); // Debug error
            alert('Error adding supplier: ' + (error.response?.data.message || error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="supplier-form">
            <h2>Add Supplier</h2>
            <div>
                <label>Supplier Name</label>
                <input type="text" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} required />
            </div>
            <div>
                <label>Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
                <label>Tax No</label>
                <input type="text" value={taxNo} onChange={(e) => setTaxNo(e.target.value)} />
            </div>
            <div>
                <label>Country</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div>
                <label>Mobile No</label>
                <input type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
            </div>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            <button type="submit">Add Supplier</button>
        </form>
    );
};

export default AddSupplier;
