import axios from "axios";
import apiClient from "./axios";

const API_URL = "/auth";

export const login = async (credentials) => {
  const res = await apiClient.post(`${API_URL}/login`, credentials);
  return res.data;
};
