import { getToken } from './authenticate';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authenticatedFetch = async (url, method, body) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    return await response.json();
  } else {
    return [];
  }
};

export const addToFavourites = async (id) => {
  return authenticatedFetch(`favourites/${id}`, 'PUT');
};

export const removeFromFavourites = async (id) => {
  return authenticatedFetch(`favourites/${id}`, 'DELETE');
};

export const getFavourites = async () => {
  return authenticatedFetch('favourites', 'GET');
};

export const addToHistory = async (id) => {
  return authenticatedFetch(`history/${id}`, 'PUT');
};

export const removeFromHistory = async (id) => {
  return authenticatedFetch(`history/${id}`, 'DELETE');
};

export const getHistory = async () => {
  return authenticatedFetch('history', 'GET');
};
