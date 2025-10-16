import axios from 'axios';

const jsonClient = axios.create({
  baseURL: import.meta.env.VITE_JSON_SERVER_URL,
  timeout: 10000,
});

export default jsonClient;
