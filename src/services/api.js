import axios from 'axios';

const api = axios.create({
    baseURL: "https://varrelimp.com.br/app",
});
export default api;

