// src/services/api.js
import axios from 'axios';

//const API_URL = 'http://localhost:5000/data'; // Adjust URL as per your backend API

const fetchData = async (filters) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
        const response = await axios.get(`http://localhost:5000/data?${queryString}`);
        console.log(response.data)
        return response.data;
    //return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export { fetchData };
