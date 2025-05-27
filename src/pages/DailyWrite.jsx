import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/pages/DailyWrite.module.scss";

const DailyWrite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const dateParam = params.get("date");
  const [date, setDate] = useState(
    dateParam ? dayjs(dateParam).toDate() : new Date()
  );
  const [showPicker, setShowPicker] = useState(false);
  const [content, setContent] = useState("");
  const [isShared, setIsShared] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState("");

  const handleSubmit = () => {
    const data = {
      date: dayjs(date).format("YYYY-MM-DD"),
      content,
      shared: isShared,
      friend: isShared ? selectedFriend : null,
    };
    console.log(data);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.dateRow}>
          <span className={styles.dateText}>
            {dayjs(date).format("YYYY. MM. DD")}
          </span>
          <button
            className={styles.editBtn}
            onClick={() => setShowPicker(!showPicker)}
          >
            수정
          </button>
        </div>

        {showPicker && (
          <div className={styles.datePickerWrapper}>
            <DatePicker
              selected={date}
              onChange={(date) => {
                setDate(date);
                setShowPicker(false);
              }}
              inline
            />
          </div>
        )}

        <textarea
          placeholder="일정을 등록해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
            <label className={styles.label}>선택</label>
            <select
              className={styles.select}
              value={selectedFriend}
              onChange={(e) => setSelectedFriend(e.target.value)}
            >
              <option value="">친구를 선택하세요</option>
              <option value="ampmgrow@gmail.com">ampmgrow@gmail.com</option>
              <option value="ampmgrow.go@gmail.com">
                ampmgrow.go@gmail.com
              </option>
            </select>

            <label className={styles.label}>추가</label>
            <div className={styles.selectedFriendBox}>
              {selectedFriend || "선택된 친구가 없습니다"}
            </div>
          </>
        )}

        <button className={styles.submitBtn} onClick={handleSubmit}>
          등록
        </button>

        <button
          className={styles.todayLink}
          onClick={() =>
            navigate(`/diary?date=${dayjs().format("YYYY-MM-DD")}`)
          }
        >
          오늘 날짜로 일기 쓰기
        </button>
      </div>
    </Layout>
  );
};

export default DailyWrite;
