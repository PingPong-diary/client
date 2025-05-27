import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Layout from "../components/common/Layout";
import styles from "../styles/pages/Main.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Main = () => {
  const [diaries, setDiaries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/diary/shared")
      .then((res) => setDiaries(res.data))
      .catch((err) => console.error("교환일기 불러오기 실패", err));
  }, []);

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* 광고 슬라이더 */}
        <Slider {...sliderSettings}>
          <div className={styles.yellowBackground}>
            <img
              src="/ads/banner1.png"
              alt="배너1"
              className={styles.bannerImage}
            />
          </div>
          <div className={styles.peachBackground}>
            <img
              src="/ads/banner2.png"
              alt="배너2"
              className={styles.bannerImage}
            />
          </div>
        </Slider>

        {/* 교환일기 리스트 */}
        <div className={styles.listHeader}>
          <h3>교환 일기 리스트</h3>
        </div>

        <div className={styles.diaryList}>
          {diaries.map((d) => (
            <div
              key={d.id}
              className={styles.diaryCard}
              onClick={() => navigate(`/diary/shared/${d.id}`)}
            >
              <div className={styles.title}>{d.title}</div>
              <div className={styles.preview}>{d.content.slice(0, 40)}...</div>
              <div className={styles.meta}>
                <span>{d.date}</span>
                <span>
                  {d.weather} / {d.emotionColor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Main;
