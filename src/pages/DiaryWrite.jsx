import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/DiaryWrite.module.scss";

export default function DiaryWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const writeDiary = async () => {
    try {
      await axios.post(
        "/diary",
        { title, content, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("일기 저장 성공!");
      navigate("/");
    } catch (err) {
      alert("일기 저장 실패");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>교환일기 쓰기</h2>

      <label className={styles.label}>제목</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="일기 제목"
        className={styles.input}
      />

      <label className={styles.label}>날짜</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={styles.input}
      />

      <label className={styles.label}>내용</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        placeholder="오늘 있었던 일..."
        className={styles.textarea}
      />

      <button onClick={writeDiary} className={styles.button}>
        저장하기
      </button>
    </div>
  );
}
