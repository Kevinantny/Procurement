
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SupplierList.css'; // Ensure this CSS file exists
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate(); // Correctly define navigate inside the component

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('/api/suppliers');
                setSuppliers(response.data);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };
        fetchSuppliers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this supplier?')) {
            try {
                await axios.delete(`/api/suppliers/${id}`);
                setSuppliers(suppliers.filter(supplier => supplier._id !== id));
                alert('Supplier deleted successfully!');
            } catch (error) {
                console.error('Error deleting supplier:', error);
            }
        }
    };

    return (
        <div className="supplier-list">
            <h1>Suppliers</h1>
            <ul>
                {suppliers.map(supplier => (
                    <li key={supplier._id}>
                        Supplier Name: {supplier.supplierName}
                        <button onClick={() => handleDelete(supplier._id)}>Delete</button>
                        <button onClick={() => navigate(`/suppliers/update/${supplier._id}`)}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SupplierList;
