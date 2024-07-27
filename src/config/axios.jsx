import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      timeout: 5000,
});