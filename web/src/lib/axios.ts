import axios from "axios";

export const api = axios.create({
  baseURL: 'https://nlw-setup-api-atz5.onrender.com' 
  // 'http://localhost:3333'
})