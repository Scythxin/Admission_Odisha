// Central API configuration
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/index.php';
const ASSETS_BASE = API_BASE ? API_BASE.replace('/index.php', '') : '';

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const authHeaders = token ? { "Authorization": `Bearer ${token}` } : {};
  
  const mergedOptions = {
    ...options,
    headers: {
      ...options.headers,
      ...authHeaders
    }
  };
  return fetch(url, mergedOptions);
};

export { API_BASE, ASSETS_BASE };
export default API_BASE;
