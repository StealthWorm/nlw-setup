import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:3333'
  // 'https://nlw-setup-api-atz5.onrender.com' 
})