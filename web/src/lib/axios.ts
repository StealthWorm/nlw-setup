import axios from "axios";
// import { env } from "../env";

export const api = axios.create({
  baseURL: import.meta.env.VITE_NODE_ENV == "production" ? 'https://nlw-setup-api-atz5.onrender.com' : 'https://nlw-setup-api-atz5.onrender.com'
})