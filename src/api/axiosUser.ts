import axios from "axios";

const instance = axios.create({
  baseURL: 'https://userss.vercel.app',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true
})

export default instance;