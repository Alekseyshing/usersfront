/// <reference types="vite/client" />

export const REACT_APP_SERVER_URL = process.env.NODE_ENV === 'production' 
  ? 'https://userss.vercel.app'
  : 'http://localhost:5001';