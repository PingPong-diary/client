import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "../styles/pages/ScheduleWrite.module.scss";

export default function ScheduleWrite() {
  const token = useSelector((state) => state.user.token);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const initialDate =
    params.get("date") || new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(initialDate);
  const [content, setContent] = useState("");
  const [isShared, setIsShared] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [manualEmail, setManualEmail] = useState("");

  // 친구 목록 불러오기
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get("/friend/list", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriendList(res.data.data || []);
      } catch (err) {
        console.error("친구 목록 불러오기 실패", err);
      }
    };

    fetchFriends();
  }, [token]);

  const handleAddManual = () => {
    if (manualEmail && !selectedFriends.includes(manualEmail)) {
      setSelectedFriends([...selectedFriends, manualEmail]);
      setManualEmail("");
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "/daily",
        {
          date,
          content,
          shared: isShared,
          sharedWith: isShared ? selectedFriends : [],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("일정이 등록되었습니다.");
      navigate("/schedule/calendar");
    } catch (err) {
      alert("등록 실패");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>일정 등록</h2>

      <label>날짜</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={styles.input}
      />

      <label>일정 내용</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="일정을 등록해주세요"
        className={styles.textarea}
      />

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={isShared}
          onChange={(e) => setIsShared(e.target.checked)}
        />
        친구와 공유할래요
      </label>

      {isShared && (
        <>
          <label>선택</label>
          <div className={styles.friendList}>
            {friendList.map((f) => (
              <label key={f.email}>
                <input
                  type="checkbox"
                  value={f.email}
                  checked={selectedFriends.includes(f.email)}
                  onChange={(e) =>
                    setSelectedFriends((prev) =>
                      e.target.checked
                        ? [...prev, f.email]
                        : prev.filter((v) => v !== f.email)
                    )
                  }
                />
                {f.email}
              </label>
            ))}
          </div>

          <label>추가</label>
          <div className={styles.manualAdd}>
            <input
              type="email"
              value={manualEmail}
              onChange={(e) => setManualEmail(e.target.value)}
              placeholder="직접 이메일 입력"
              className={styles.input}
            />
            <button
              type="button"
              onClick={handleAddManual}
              className={styles.addBtn}
            >
              추가
            </button>
          </div>
        </>
      )}

      <button onClick={handleSubmit} className={styles.submitBtn}>
        등록
      </button>
    </div>
  );
}
