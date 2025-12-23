
const isProduction = window.location.hostname !== 'localhost';

const API_URL = isProduction 
  ? 'https://service-dir-backend.onrender.com/api' 
  : 'http://localhost:5001/api';

export default API_URL;