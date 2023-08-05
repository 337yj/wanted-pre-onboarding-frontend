import { useContext } from "react";
import useAuthContext from "../../../context/AuthContext";
import styles from "./header.module.scss";

const Header = () => {
  const { token, clearToken } = useContext(useAuthContext);

  const logout = () => {
    clearToken();
  };

  return (
    <header>
      {token !== null && (
        <div className={styles.wrapper}>
          <h1>ToDo List</h1>
          <button type="button" onClick={logout}>
            로그아웃
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
