import React, { useState } from "react";
import dayjs from "dayjs";
import Layout from "../components/common/Layout";
import Calendar from "../components/common/Calendar";
import styles from "../styles/pages/DiaryList.module.scss";

const diaryCalendarData = {};

const DiaryList = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <Layout>
      <div className={styles.pagePadding}>
        <h2>교환일기 목록</h2>

        <Calendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          data={diaryCalendarData}
          type="diary"
        />

        <div className={styles.topMargin}>
          <p>
            <strong>{selectedDate.format("YYYY년 MM월 DD일")}</strong>의 일기
          </p>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default DiaryList;
