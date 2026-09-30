// Equivalent to Angular's environment.ts — one place to change the backend URL.
export const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:7000/api'
};
