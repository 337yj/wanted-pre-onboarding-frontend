import React, { useContext } from "react";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header>
      <div className={styles.wrapper}>
        <h1>ToDo List</h1>
        <button type="button">로그아웃</button>
      </div>
    </header>
  );
};

export default Header;
