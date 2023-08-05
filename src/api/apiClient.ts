import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop/",
  timeout: 5000,
});

apiClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default apiClient;
