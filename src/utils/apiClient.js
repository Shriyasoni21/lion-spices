export const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

console.log('API =', API_BASE_URL || '(relative /api)');

export const apiFetch = async (endpoint, options = {}) => {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${normalizedEndpoint}`;
  console.log('API request', { url, options });

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

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
};
