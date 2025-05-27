import React, { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import Calendar from "../components/common/Calendar";
import styles from "../styles/pages/CalendarPage.module.scss";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const navigate = useNavigate();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    navigate(`/daily/write?date=${date.format("YYYY-MM-DD")}`);
  };

  return (
    <Layout>
      <div className={styles.pageWrapper}>
        <div className={styles.innerContainer}>
          <h2>일정 보기</h2>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            data={{}}
            type="daily"
          />
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
