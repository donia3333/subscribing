import axios from "axios";

const API_URL = "http://localhost:5000";

export const signupUser = async (userData: any) => {
  const response = await axios.post(`${API_URL}/users/signUp`, userData);
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await axios.get(
    `${API_URL}/users/verifyEmail?token=${token}`
  );
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users/getUsers`);
  return response.data;
};

export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/users/login`, loginData);
  return response.data;
};
