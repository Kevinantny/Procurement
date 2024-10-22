
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Import the Navbar component
import HomePage from './Components/HomePage';
import AddSupplier from './Components/Supplier/AddSupplier';
import SupplierList from './Components/Supplier/SupplierList';
import UpdateSupplier from './Components/Supplier/UpdateSupplier'; // Import UpdateSupplier component
import AddPurchaseOrder from './Components/PurchaseOrder/AddPurchaseOrder';
import PurchaseOrderList from './Components/PurchaseOrder/PurchaseOrderList';
import AddItem from './Components/Item/AddItem';
import ItemList from './Components/Item/ItemList';

const App = () => {
    return (
        <Router>
            <Navbar /> {/* Include the Navbar at the top */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/suppliers/add" element={<AddSupplier />} />
                <Route path="/suppliers/list" element={<SupplierList />} />
                <Route path="/suppliers/update/:id" element={<UpdateSupplier />} />
                <Route path="/purchase-orders/add" element={<AddPurchaseOrder />} />
                <Route path="/purchase-orders/list" element={<PurchaseOrderList />} />
                <Route path="/items/add" element={<AddItem />} />
                <Route path="/items/list" element={<ItemList />} />
            </Routes>
        </Router>
    );
};

export default App;
