// src/Components/PurchaseOrder/PurchaseOrderList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PurchaseOrderList.css'; // Make sure this file exists and is styled accordingly
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Import XLSX for exporting to Excel

const PurchaseOrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/purchase-orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching purchase orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this purchase order?')) {
            try {
                await axios.delete(`/api/purchase-orders/${id}`);
                setOrders(orders.filter(order => order._id !== id));
                alert('Purchase order deleted successfully!');
            } catch (error) {
                console.error('Error deleting purchase order:', error);
            }
        }
    };

    const exportToExcel = (order) => {
        const ws = XLSX.utils.json_to_sheet(order.items.map(item => ({
            Item: item.item,
            OrderQuantity: item.orderQty,
            UnitPrice: item.unitPrice,
            Discount: item.discount,
            StockUnit: item.stockUnit,
            PackingUnit: item.packingUnit,
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Purchase Order');

        XLSX.writeFile(wb, `purchase_order_${order.orderNo}.xlsx`);
    };

    const handlePrint = (order) => {
        const printContent = `
            <h2>Purchase Order #${order.orderNo}</h2>
            <p>Supplier: ${order.supplier ? order.supplier.supplierName : 'N/A'}</p>
            <table border="1">
                <tr>
                    <th>Item</th>
                    <th>Order Quantity</th>
                    <th>Unit Price</th>
                    <th>Discount</th>
                    <th>Stock Unit</th>
                    <th>Packing Unit</th>
                </tr>
                ${order.items.map(item => `
                    <tr>
                        <td>${item.item}</td>
                        <td>${item.orderQty}</td>
                        <td>${item.unitPrice}</td>
                        <td>${item.discount}</td>
                        <td>${item.stockUnit}</td>
                        <td>${item.packingUnit}</td>
                    </tr>
                `).join('')}
            </table>
        `;

        const newWindow = window.open('', '_blank');
        newWindow.document.write(printContent);
        newWindow.document.close();
        newWindow.print();
    };

    return (
        <div className="purchase-order-list">
            <h1>Purchase Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        Order No: {order.orderNo} - Supplier: {order.supplier ? order.supplier.supplierName : 'N/A'}
                        <button onClick={() => handleDelete(order._id)}>Delete</button>
                        {/* <button onClick={() => navigate(`/purchase-orders/update/${order._id}`)}>Update</button> */}
                        <button onClick={() => exportToExcel(order)}>Export</button>
                        <button onClick={() => handlePrint(order)}>Print</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PurchaseOrderList;
