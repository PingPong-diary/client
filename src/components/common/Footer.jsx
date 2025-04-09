import React from "react";
import styles from "../../styles/components/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img src="/assets/images/logo.png" alt="핑퐁 다이어리 로고" />
      </div>
      <ul className={styles.navLinks}>
        <li>주식회사</li>
        <li>만든이</li>
        <li>대표 메일</li>
        <li>대표 번호</li>
        <li>깃허브 정보</li>
      </ul>
    </footer>
  );
};

export default Footer;
