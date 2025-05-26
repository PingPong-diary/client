import React, { useState } from "react";
import styles from "../../styles/pages/CalendarPage.module.scss";
import dayjs from "dayjs";

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = ({
  selectedDate,
  onDateSelect,
  data = {},
  type = "diary",
}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const calendarDates = [];
  let date = startDate;
  while (date.isBefore(endDate) || date.isSame(endDate)) {
    calendarDates.push(date);
    date = date.add(1, "day");
  }

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const isSameDate = (d1, d2) =>
    d1.format("YYYY-MM-DD") === d2.format("YYYY-MM-DD");
  const getDayColor = (dayIndex) => {
    if (dayIndex === 0) return styles.sunday;
    if (dayIndex === 6) return styles.saturday;
    return "";
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <button onClick={handlePrevMonth} className={styles.navBtn}>
          {"<"}
        </button>
        <span className={styles.monthLabel}>
          {currentMonth.format("YYYY년 M월")}
        </span>
        <button onClick={handleNextMonth} className={styles.navBtn}>
          {">"}
        </button>
      </div>
      <div className={styles.calendarGrid}>
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className={`${styles.dayLabel} ${getDayColor(idx)}`}>
            {day}
          </div>
        ))}
        {calendarDates.map((date, idx) => {
          const isSelected = isSameDate(date, selectedDate);
          const inThisMonth = date.month() === currentMonth.month();
          const dayIdx = date.day();
          const formatted = date.format("YYYY-MM-DD");
          const dayColorClass = inThisMonth ? getDayColor(dayIdx) : "";

          return (
            <div
              key={idx}
              className={`
                ${styles.dateCell}
                ${inThisMonth ? styles.inMonth : styles.outMonth}
                ${dayColorClass}
                ${isSelected ? styles.selected : ""}
              `}
              onClick={() => inThisMonth && onDateSelect(date)}
            >
              {date.date()}

              {/* diary 전용 dot group */}
              {type === "diary" &&
                inThisMonth &&
                Array.isArray(data[formatted]) && (
                  <div className={styles.dotGroup}>
                    {data[formatted].map((entry, i) => (
                      <span
                        key={i}
                        className={styles.dot}
                        style={{ backgroundColor: entry.emotionColor }}
                        title={entry.nickname}
                      ></span>
                    ))}
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
