import React from "react";
import styles from "../../styles/pages/DiaryList.module.scss";

const EmotionDots = ({ emotions }) => (
  <div style={{ display: "flex", gap: "4px", marginTop: "6px" }}>
    {emotions.map((e, i) => (
      <div
        key={i}
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: e.color,
        }}
        title={e.nickname}
      />
    ))}
  </div>
);

const CalendarCell = ({
  date,
  emotionData,
  isToday,
  isCurrentMonth,
  weekdayIndex,
}) => {
  const day = new Date(date).getDate();
  const match = emotionData.find((d) => d.date === date);

  const classNames = [
    styles.dayCell,
    isToday && styles.today,
    !isCurrentMonth && styles.faded,
    weekdayIndex === 0 && styles.sun,
    weekdayIndex === 6 && styles.sat,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames}>
      {day}
      {match && <EmotionDots emotions={match.emotions} />}
    </div>
  );
};

export default CalendarCell;
