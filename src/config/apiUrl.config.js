// Define the API URL based on the environment (set in .env files)
// Provide a fallback to localhost so the frontend still works when
// Vite doesn't load the .env (or in some CI / editors).
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export { API_URL };
