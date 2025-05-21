import { Link } from "react-router-dom";
import styles from "../../styles/components/FooterMobile.module.scss";
import { FaHome, FaCalendarAlt, FaBook, FaShoppingCart } from "react-icons/fa";

const FooterMobile = () => {
  return (
    <nav className={styles.footerMobile}>
      <Link to="/">
        <FaHome />
        <span>홈</span>
      </Link>
      <Link to="/calendar">
        <FaCalendarAlt />
        <span>일정</span>
      </Link>
      <Link to="/diary">
        <FaBook />
        <span>일기쓰기</span>
      </Link>
      <Link to="/shop">
        <FaShoppingCart />
        <span>구매</span>
      </Link>
    </nav>
  );
};

export default FooterMobile;
