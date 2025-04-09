import React from "react";
import styles from "../../styles/components/FooterMobile.module.scss";
import { FaHome, FaCalendarAlt, FaBook, FaShoppingCart } from "react-icons/fa";

const FooterMobile = () => {
  return (
    <nav className={styles.footerMobile}>
      <ul className={styles.navLinks}>
        <li>
          <FaHome /> 홈
        </li>
        <li>
          <FaCalendarAlt /> 일정
        </li>
        <li>
          <FaBook /> 일기쓰기
        </li>
        <li>
          <FaShoppingCart /> 구매
        </li>
      </ul>
    </nav>
  );
};

export default FooterMobile;
