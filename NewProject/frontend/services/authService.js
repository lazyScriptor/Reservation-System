// src/services/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const register = async (username, password) => {
  return axios.post(`${API_URL}/auth/register`, { username, password });
};

export const login = async (username, password) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const refreshToken = async () => {
  return axios.get(`${API_URL}/user/refresh-token`, { withCredentials: true });
};

export const logout = async () => {
  return axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
};
