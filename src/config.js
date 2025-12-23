
const isProduction = window.location.hostname !== 'localhost';

export const API_URL = isProduction 
  ? 'https://service-dir-backend.onrender.com/api' 
  : 'http://localhost:5001/api';