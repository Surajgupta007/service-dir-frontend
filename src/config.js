// This file manages your API URL.
// When you deploy, you only need to change this ONE line.

const isProduction = window.location.hostname !== 'localhost';

export const API_URL = isProduction 
  ? 'https://service-dir-backend.onrender.com/api' // We will update this later after deployment
  : 'http://localhost:5001/api';