import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import Header from "./Header";

const Layout = () => {
  return (
    <section>
      <AuthContextProvider>
        <Header />
        <Outlet />
      </AuthContextProvider>
    </section>
  );
};

export default Layout;
