// src/Components/Item/ItemList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ItemList.css'; // Create this CSS file for styling

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await axios.get('/api/items');
            setItems(response.data);
        };
        fetchItems();
    }, []);

    return (
        <div className="item-list">
            <h2>Items</h2>
            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        {item.itemName} - Price: ${item.unitPrice} - Location: {item.inventoryLocation}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
