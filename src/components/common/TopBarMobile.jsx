import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/components/TopBarMobile.module.scss";
import { FaBell, FaCog } from "react-icons/fa";

const TopBarMobile = () => {
  return (
    <div className={styles.topBarMobile}>
      <Link to="/" className={styles.logoLink}>
        <img
          src="/assets/images/logo.png"
          alt="핑퐁 다이어리 로고"
          className={styles.logo}
        />
      </Link>
      <div className={styles.icons}>
        <FaBell />
        <FaCog />
      </div>
    </div>
  );
};

export default TopBarMobile;
