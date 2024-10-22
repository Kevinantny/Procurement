
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdatePurchaseOrder.css'; 
import './AddPurchaseOrder.css';

const UpdatePurchaseOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            const response = await axios.get(`/api/purchase-orders/${id}`);
            setOrder(response.data);
        };
        fetchOrder();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/purchase-orders/${id}`, order);
            alert('Purchase order updated successfully!');
            navigate('/purchase-orders');
        } catch (error) {
            console.error(error);
            alert('Error updating purchase order!');
        }
    };

    if (!order) return <div>Loading...</div>;

    return (
        <form onSubmit={handleUpdate} className="purchase-order-form">
            <h2>Update Purchase Order</h2>
            <div>
                <label>Supplier</label>
                <input type="text" value={order.supplier} onChange={(e) => setOrder({ ...order, supplier: e.target.value })} required />
            </div>
            {order.items.map((item, index) => (
                <div key={index} className="item-container">
                    <label>Item {index + 1}</label>
                    <input type="text" placeholder="Item Name" value={item.item} onChange={(e) => {
                        const newItems = [...order.items];
                        newItems[index].item = e.target.value;
                        setOrder({ ...order, items: newItems });
                    }} required />
                    <input type="number" placeholder="Order Qty" value={item.orderQty} onChange={(e) => {
                        const newItems = [...order.items];
                        newItems[index].orderQty = e.target.value;
                        setOrder({ ...order, items: newItems });
                    }} required />
                    <input type="number" placeholder="Unit Price" value={item.unitPrice} onChange={(e) => {
                        const newItems = [...order.items];
                        newItems[index].unitPrice = e.target.value;
                        setOrder({ ...order, items: newItems });
                    }} required />
                    <input type="number" placeholder="Discount" value={item.discount} onChange={(e) => {
                        const newItems = [...order.items];
                        newItems[index].discount = e.target.value;
                        setOrder({ ...order, items: newItems });
                    }} />
                </div>
            ))}
            <button type="submit">Update Order</button>
        </form>
    );
};

export default UpdatePurchaseOrder;
