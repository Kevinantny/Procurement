import axios from 'axios';

const API_URL = '/api/purchase-orders';

export const getAllPurchaseOrders = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createPurchaseOrder = async (purchaseOrderData) => {
    const response = await axios.post(API_URL, purchaseOrderData);
    return response.data;
};

export const updatePurchaseOrder = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
};

export const deletePurchaseOrder = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
