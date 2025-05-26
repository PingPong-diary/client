import React from "react";
import styles from "../../styles/components/Header.module.scss";
import { FaBell, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.menu}>
          <Link to="/login" className={styles.link}>
            로그인
          </Link>
          <Link to="/join" className={styles.link}>
            회원가입
          </Link>
          <Link to="/orders" className={styles.link}>
            주문조회
          </Link>
        </div>
      </div>

      <nav className={styles.navBar}>
        <Link to="/" className={styles.logo}>
          <img src="/assets/images/logo.png" alt="핑퐁 다이어리 로고" />
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/calendar">일정</Link>
          </li>
          <li>
            <Link to="/diary">일기쓰기</Link>
          </li>
          <li>
            <Link to="/shop">구매</Link>
          </li>
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
