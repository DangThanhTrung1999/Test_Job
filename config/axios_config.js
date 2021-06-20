import axios from 'axios';
const baseUrl = process.env.API_BASE_URL;

const axiosConfig = {
  baseUrl: baseUrl,
};

const axios_instance = axios.create(axiosConfig);

export default axios_instance;
