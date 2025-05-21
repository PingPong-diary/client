import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/DiaryList.module.scss";

export default function DiaryList() {
  const token = useSelector((state) => state.user.token);
  const [diaries, setDiaries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDiaryList = async () => {
      try {
        const res = await axios.get("/diary/list", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDiaries(res.data.data);
      } catch (err) {
        alert("일기 목록 불러오기 실패");
      }
    };
    getDiaryList();
  }, [token]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>내 일기 목록</h2>
      <ul className={styles.list}>
        {diaries.map((diary) => (
          <li
            key={diary.id}
            className={styles.item}
            onClick={() => navigate(`/diary/${diary.id}`)}
          >
            <div className={styles.itemTitle}>{diary.title}</div>
            <div className={styles.itemDate}>{diary.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
