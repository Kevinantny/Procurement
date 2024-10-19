import axios from 'axios';

const API_URL = '/api/suppliers';

export const getAllSuppliers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
