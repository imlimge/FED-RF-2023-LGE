// 스와이퍼 플러그인 컴포넌트

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './css/swiper.css';

// import required modules
import { Autoplay,Pagination, Navigation } from 'swiper/modules';

export function SwiperApp() {


  const imgArr = ["dcm28","dcm29","dcm30","dcm39","dcm40","dcm41","dcm42","dcm43"];



  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
          
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}

        navigation={true}
     
        //사용할 모듈을 여기에 적용
        modules={[Autoplay,Pagination,Navigation]}

        className="mySwiper"
      >

        {
          imgArr.map((v,i)=>
          <SwiperSlide key={i}>
            <img src={"./images/"+v+".jpg"} alt="list image" />
          </SwiperSlide> )
         
        }
     
      </Swiper>
    </>
  );
}


