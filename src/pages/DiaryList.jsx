import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "../styles/pages/DiaryList.module.scss";
import CalendarCell from "../components/common/CalendarCell";
import Layout from "../components/common/Layout";

export default function DiaryList() {
  const token = useSelector((state) => state.user.token);
  const [diaries, setDiaries] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed
  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const res = await axios.get("/diary/list", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDiaries(res.data.data);
      } catch (err) {
        alert("일기 목록 불러오기 실패");
        console.error(err);
      }
    };
    fetchDiaries();
  }, [token]);

  const groupByDate = (list) => {
    const grouped = {};
    list.forEach((diary) => {
      const date = diary.date;
      if (!grouped[date]) grouped[date] = [];

      grouped[date].push({
        color: mapEmotionColor(diary.emotionColor),
        nickname: diary.nickname || "나",
      });
    });

    return Object.entries(grouped).map(([date, emotions]) => ({
      date,
      emotions,
    }));
  };

  const mapEmotionColor = (code) => {
    const map = {
      1: "#f87171",
      2: "#fbbf24",
      3: "#34d399",
      4: "#60a5fa",
    };
    return map[code] || "#d1d5db";
  };

  const emotionData = groupByDate(diaries);

  // 정확하게 달력용 날짜 배열을 생성
  const getMonthDates = (year, month) => {
    const result = [];

    // 이번 달의 첫 날짜
    const firstDate = new Date(year, month, 1);
    const firstDayOfWeek = firstDate.getDay(); // 요일: 0~6 (일~토)

    // 달력 시작일: 첫 날 기준으로 그 주의 일요일 계산
    const startDate = new Date(year, month, 1 - firstDayOfWeek);

    // 6주 × 7일 = 42칸 고정
    for (let i = 0; i < 42; i++) {
      result.push(
        new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + i
        )
      );
    }

    return result;
  };

  const handlePrev = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const dates = getMonthDates(year, month);

  return (
    <Layout>
      <div className={styles.container}>
        {/* 년월 헤더 */}
        <div className={styles.monthHeader}>
          <button onClick={handlePrev}>〈</button>
          <span>
            {year}년 {month + 1}월
          </span>
          <button onClick={handleNext}>〉</button>
        </div>

        {/* 요일 */}
        <div className={styles.weekdays}>
          <div className={styles.sun}>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div className={styles.sat}>토</div>
        </div>

        {/* 달력 */}
        <div className={styles.calendarGrid}>
          {dates.map((date, index) => {
            const dateStr = date.toISOString().split("T")[0];
            const isToday = dateStr === todayStr;
            const isCurrentMonth = date.getMonth() === month;

            return (
              <CalendarCell
                key={dateStr}
                date={dateStr}
                emotionData={emotionData}
                isToday={isToday}
                isCurrentMonth={isCurrentMonth}
                weekdayIndex={index % 7} // ← 요일 정렬 정확히 고정
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
