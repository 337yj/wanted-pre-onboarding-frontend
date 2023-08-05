import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { token } = useContext(useAuthContext);
  if (token === null) {
    // 토큰이 null일 때는 로그인 페이지로 이동
    return <Navigate to="/signin" />;
  } else {
    // 토큰이 null이 아닐 때는 다른 페이지로 접근할 수 있도록 Outlet을 리턴
    return <Outlet />;
  }
};

export default ProtectedRoute;
