import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export const UnAuthorized = () => {
  const { token } = useContext(useAuthContext);
  if (token !== null) {
    return <Navigate to="/todo" />;
  } else {
    return <Outlet />;
  }
};

export const Authorized = () => {
  const { token } = useContext(useAuthContext);
  if (token === null) {
    return <Navigate to="/signin" />;
  } else {
    return <Outlet />;
  }
};
