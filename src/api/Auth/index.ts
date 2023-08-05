import { UserAuth } from "../../types";
import apiClient from "../apiClient";

export const signUp = (body: UserAuth) => {
  return apiClient.post("/auth/signup", body);
};

export const signIn = (body: UserAuth) => {
  return apiClient.post("/auth/signin", body);
};
