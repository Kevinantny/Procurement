// src/Components/Supplier/UpdateSupplier.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateSupplier.css'; // Ensure this file exists

const UpdateSupplier = () => {
    const { id } = useParams(); // Get the supplier ID from the route
    const navigate = useNavigate();
    const [supplierName, setSupplierName] = useState('');
    const [address, setAddress] = useState('');
    const [taxNo, setTaxNo] = useState('');
    const [country, setCountry] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Active');

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`/api/suppliers/${id}`);
                const supplier = response.data;
                setSupplierName(supplier.supplierName);
                setAddress(supplier.address);
                setTaxNo(supplier.taxNo);
                setCountry(supplier.country);
                setMobileNo(supplier.mobileNo);
                setEmail(supplier.email);
                setStatus(supplier.status);
            } catch (error) {
                console.error('Error fetching supplier:', error);
            }
        };
        fetchSupplier();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/suppliers/${id}`, {
                supplierName,
                address,
                taxNo,
                country,
                mobileNo,
                email,
                status,
            });
            alert('Supplier updated successfully!');
            navigate('/suppliers/list'); // Navigate back to the supplier list
        } catch (error) {
            console.error('Error updating supplier:', error);
            alert('Error updating supplier: ' + (error.response?.data.message || error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="update-supplier-form">
            <h2>Update Supplier</h2>
            <div>
                <label>Supplier Name</label>
                <input
                    type="text"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Address</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div>
                <label>Tax No</label>
                <input
                    type="text"
                    value={taxNo}
                    onChange={(e) => setTaxNo(e.target.value)}
                />
            </div>
            <div>
                <label>Country</label>
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>
            <div>
                <label>Mobile No</label>
                <input
                    type="text"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            <button type="submit">Update Supplier</button>
        </form>
    );
};

export default UpdateSupplier;
