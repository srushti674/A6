import jwt_decode from "jwt-decode";

function setToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem("token", token);
  }
}

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("token");
  }
  return null;
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem("token");
  }
}

export function readToken() {
  const token = getToken();
  return token ? jwt_decode(token) : null;
}

export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}

export async function authenticateUser(user, password) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, password }),
  });
  const data = await response.json();

  if (response.ok) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message);
  }
}

export async function registerUser(user, password, password2) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, password, password2 }),
  });

  const data = await response.json();

  if (response.ok) {
    return true;
  } else {
    throw new Error(data.message);
  }
}

  