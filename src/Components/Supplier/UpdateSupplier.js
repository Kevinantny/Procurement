// src/Components/Supplier/UpdateSupplier.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateSupplier.css'; // Create and style this file accordingly
import './UpdateSupplier.css';

const UpdateSupplier = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState('');

    useEffect(() => {
        const fetchSupplier = async () => {
            const response = await axios.get(`/api/suppliers/${id}`);
            setSupplier(response.data.supplierName);
        };
        fetchSupplier();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/suppliers/${id}`, { supplierName: supplier });
            alert('Supplier updated successfully!');
            navigate('/suppliers');
        } catch (error) {
            console.error(error);
            alert('Error updating supplier!');
        }
    };

    return (
        <form onSubmit={handleUpdate} className="supplier-form">
            <h2>Update Supplier</h2>
            <div>
                <label>Supplier Name</label>
                <input type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} required />
            </div>
            <button type="submit">Update Supplier</button>
        </form>
    );
};

export default UpdateSupplier;
