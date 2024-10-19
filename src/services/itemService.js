import axios from 'axios';

const API_URL = '/api/items';

export const getAllItems = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
