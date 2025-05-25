import React from "react";
import CalendarCell from "./CalendarCell";

const Calendar = ({ emotionData }) => {
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2025, 3, i + 1);
    return date.toISOString().split("T")[0];
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "4px",
      }}
    >
      {dates.map((date) => (
        <CalendarCell key={date} date={date} emotionData={emotionData} />
      ))}
    </div>
  );
};

export default Calendar;
