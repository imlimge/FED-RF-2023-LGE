// 캐릭터 리스트용 스와이퍼 컴포넌트

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// 캐릭터 리스트 데이터 가져오기
import { catListData } from "../data/swiper_cat";


// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';

import "./css/swiper_cat.css";

// import required modules
// 사용할 스와이퍼 모듈을 불러온다
// (여기서는 페이지네이션,네비게이션,자동넘김)
import { Navigation } from "swiper/modules";

export function SwiperCat() {

  // 선택데이터
  const selData = catListData;




  // 불러올 이미지 리스트
  const imgArr = [
    "dcm28",
    "dcm29",
    "dcm30",
    "dcm31",
    "dcm32",
    "dcm10",
    "dcm11",
    "dcm12",
  ];

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
           
        loop={true}
        navigation={true}
        /* 사용할 모듈을 여기에 적용시킨다 */
        modules={[Navigation]}
        // 스와이퍼 사이즈별 슬라이드수 변경!
        breakpoints={{
    
          200: {
              slidesPerView: 1,
          },
          700: {
              slidesPerView: 2,
          },
          1000: {
              slidesPerView: 3,
          },
          1200: {
              slidesPerView: 4,
          },
        }}
        className="mySwiper2"
      >
        {
            selData.map((v,i)=>
            /* idx 고유번호가 7번 이하만 출력 */
            Number(v.idx) <= 7 && (

            <SwiperSlide key={i}>
              <Link to="/detail" >
                <section className="sw-inbox2">
                  {/* 캐릭터이미지영역 */}
                  <div className="cat-img2">
                    <img src={v.tmsrc} alt={v.cname} />
                  </div>
                  {/* 캐릭터타이틀영역 */}
                <div className="cat-tit2">
                <h3>{v.cname}</h3>
                </div>
                </section>
              </Link>
            </SwiperSlide>)
            )
          
        }        
       
      </Swiper>
    </>
  );
} /////////// SwiperApp 컴포넌트 ///////////