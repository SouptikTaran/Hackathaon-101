import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Set up Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Firebase token to requests
apiClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("firebaseToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Expenses API
export const fetchExpenses = async () => {
  const response = await apiClient.get("/expense-chart");
  return response.data;
};

export const addExpense = async (expense) => {
  const response = await apiClient.post("/expenses", expense);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await apiClient.delete(`/expenses/${id}`);
  return response.data;
};
