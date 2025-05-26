import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/pages/Login.module.scss";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = async () => {
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      const { user, token } = res.data;
      dispatch(loginSuccess({ user, token }));
      navigate("/");
    } catch (err) {
      alert("로그인 실패");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>로그인</h2>

      <input
        className={styles.input}
        placeholder="아이디를 입력해주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className={styles.emailLogin}>이메일로 로그인</button>
      <button className={styles.kakaoLogin}>카카오로 시작하기</button>
      <button className={styles.googleLogin}>구글로 시작하기</button>

      <div className={styles.links}>
        이메일 찾기 / 비밀번호 찾기 |{" "}
        <span className={styles.join}>회원가입</span>
      </div>
    </div>
  );
}
