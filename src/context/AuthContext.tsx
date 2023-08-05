import { createContext } from "react";
import { ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("ACCESS_TOKEN");

  const saveToken = useCallback(
    (token: string) => {
      localStorage.setItem("ACCESS_TOKEN", token);
      navigate("/todo");
    },
    [navigate],
  );

  const clearToken = useCallback(() => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate("/signin");
  }, [navigate]);

  return (
    <useAuthContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </useAuthContext.Provider>
  );
};

export const useAuthContext = createContext<{
  token: string | null;
  saveToken: (token: string) => void;
  clearToken: () => void;
}>({ token: null, saveToken: () => {}, clearToken: () => {} });

export default useAuthContext;
