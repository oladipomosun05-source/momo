let baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
if (baseUrl && !baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = `https://${baseUrl}`;
}
export const API_BASE_URL = baseUrl;
export const API_URL = `${API_BASE_URL}/api`;
