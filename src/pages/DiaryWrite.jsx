import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/DiaryWrite.module.scss";
import Layout from "../components/common/Layout";

export default function DiaryWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [emotion, setEmotion] = useState("");
  const [weather, setWeather] = useState("");
  const [isShared, setIsShared] = useState(false);
  const [friendList] = useState([
    "ampmgrow@gmail.com",
    "ampmgrow.go@gmail.com",
  ]);
  const [selected, setSelected] = useState([]);

  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const mapEmotion = (e) => {
    const map = {
      red: 1,
      yellow: 2,
      green: 3,
      blue: 4,
    };
    return map[e] || 0;
  };

  const writeDiary = async () => {
    try {
      await axios.post(
        "/diary",
        {
          title,
          content,
          date,
          emotionColor: mapEmotion(emotion),
          weather,
          shared: isShared,
          members: selected,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("일기 저장 성공!");
      navigate("/diary/list");
    } catch (err) {
      alert("일기 저장 실패");
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>교환일기 쓰기</h2>
          <button
            className={styles.viewListBtn}
            onClick={() => navigate("/diary/list")}
          >
            목록 보기
          </button>
        </div>

        {/* 날짜 */}
        <div className={styles.dateRow}>
          <span>{date || "작성 날짜를 선택하세요"}</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* 감정 / 날씨 선택 */}
        <div className={styles.selectRow}>
          <div className={styles.selectBox}>
            <label>오늘 나의 감정 색상은?</label>
            <select
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
            >
              <option value="">선택</option>
              <option value="red">🔴 화남</option>
              <option value="yellow">🟡 기쁨</option>
              <option value="green">🟢 안정</option>
              <option value="blue">🔵 우울</option>
            </select>
          </div>

          <div className={styles.selectBox}>
            <label>오늘의 날씨는?</label>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
            >
              <option value="">선택</option>
              <option value="sunny">☀️ 맑음</option>
              <option value="cloudy">☁️ 흐림</option>
              <option value="rainy">🌧️ 비</option>
              <option value="snowy">❄️ 눈</option>
            </select>
          </div>
        </div>

        {/* 제목/내용 */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="일기를 입력해주세요"
        />

        {/* 공유 여부 */}
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            checked={isShared}
            onChange={(e) => setIsShared(e.target.checked)}
          />
          <label>친구와 공유할래요</label>
        </div>

        {/* 친구 목록 */}
        {isShared && (
          <div className={styles.friendList}>
            <strong>선택 및 추가</strong>
            {friendList.map((email) => (
              <label key={email}>
                <input
                  type="checkbox"
                  value={email}
                  checked={selected.includes(email)}
                  onChange={(e) =>
                    setSelected((prev) =>
                      e.target.checked
                        ? [...prev, email]
                        : prev.filter((v) => v !== email)
                    )
                  }
                />
                {email}
              </label>
            ))}
          </div>
        )}

        <button className={styles.submitBtn} onClick={writeDiary}>
          등록
        </button>
      </div>
    </Layout>
  );
}
