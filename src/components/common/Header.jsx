import React from "react";
import styles from "../../styles/components/Header.module.scss";
import { FaBell, FaCog } from "react-icons/fa";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.menu}>
          <span>로그인</span>
          <span>회원가입</span>
          <span>주문조회</span>
        </div>
      </div>

      <nav className={styles.navBar}>
        <div className={styles.logo}>
          <img src="/assets/images/logo.png" alt="핑퐁 다이어리 로고" />
        </div>
        <ul className={styles.navLinks}>
          <li>홈</li>
          <li>일정</li>
          <li>일기쓰기</li>
          <li>구매</li>
        </ul>
        <div className={styles.icons}>
          <FaBell className={styles.icon} />
          <FaCog className={styles.icon} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
