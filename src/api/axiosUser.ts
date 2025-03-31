import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://userss.vercel.app/api'
    : 'http://localhost:5001/api'
})

export default instance;