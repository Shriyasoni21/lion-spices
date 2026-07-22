export const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

const normalizedEndpoint = (endpoint) => (endpoint.startsWith('/') ? endpoint : `/${endpoint}`);
export const getApiUrl = (endpoint) => (API_BASE_URL ? `${API_BASE_URL}${normalizedEndpoint(endpoint)}` : normalizedEndpoint(endpoint));

console.log('API =', API_BASE_URL || '(relative /api)');

export const apiFetch = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  console.log('API request', { url, options });

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const text = await response.text();
    let data;

    try {
      data = text ? JSON.parse(text) : null;
    } catch (err) {
      data = { text };
    }

    console.log('API response', { url, status: response.status, data });

    if (!response.ok) {
      const errorMessage = data?.error || data?.message || response.statusText;
      const error = new Error(errorMessage || 'API request failed');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    const message = err?.message || 'Unable to connect to the server.';
    const error = new Error(message.includes('Failed to fetch') ? 'Network error: Unable to reach the API server.' : message);
    error.status = err?.status || 0;
    throw error;
  }
};
