import React from "react";
import styles from "../../styles/components/TopBarMobile.module.scss";
import { FaBell, FaCog } from "react-icons/fa";

const TopBarMobile = () => {
  return (
    <div className={styles.topBarMobile}>
      <img
        src="/assets/images/logo.png"
        alt="핑퐁 다이어리 로고"
        className={styles.logo}
      />
      <div className={styles.icons}>
        <FaBell />
        <FaCog />
      </div>
    </div>
  );
};

export default TopBarMobile;
