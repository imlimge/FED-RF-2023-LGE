// 메인 페이지 JS - index.js
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
// 컨텍스트 API 불러오기
import { pCon } from './modules/PilotContext';


// 자동스크롤 JS 불러오기 >> MainCont로 옮겨져서 필요없음
import { wheelFn,evtFn } from './func/jquery-autoScroll';


import { TopArea } from './layout/TopArea';
import { MainArea } from './layout/MainArea';
import { FooterArea } from './layout/FooterArea';

// 제이쿼리
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';



// 페이지 공통 CSS
import './css/common.css';

// 최상위 Root 컴포넌트 ///////
function App(){

  // 후크상태변수 설정 : 페이지변경
  const [pgName,setPgName] = useState('main');



  // 페이지변경 상태변수 업데이트 함수
  const chgPgName = (txt) => {
    setPgName(txt);
  }; ///////// chgPgName 함수 //////



  //랜더링 후 실행구역 ///
  useEffect(()=>{
    // 햄버거 버튼 클릭 시 전체 메뉴보이기/숨기기
    $('.ham').click(e=>{
      // 전체메뉴 박스 : .mbox
      $('.mbox').fadeToggle(400);   
      // 햄버거 버튼에 클래스 on
      $(e.currentTarget).toggleClass('on')
      // e.target과 e.currentTarget 는 다름
      // e.currentTarget이 햄버거 버튼 자신
      // function 과 this 써도 된다
      // 지금은 화살표라서 this

   // 3. 비디오 재생/멈춤 : 대상 - .bgm
      // get(0)은 비디오컬렉션임! -> 제이쿼리용
      const vid = $('.bgm').get(0)
      vid.paused? vid.play() : vid.pause();
      // console.log(vid.paused);
      // paused 속성 : 동영상 멈춤일때 true 리턴
      // play() 메서드 : 동영상 재생 메서드
      // pause() 메서드 : 동영상 정지 메서드


    }); //////// click ////////

  },[]); ///useEffect ///////


  // 처음 로딩 시 스크롤 
  useLayoutEffect(()=>{
    window.scrollTo(0,0);
  })





 // 여기에 넣었었는데 >>> 지우는기능 MainCont 의 소멸자로 이동함

  // 자동스크롤 적용 이벤트 설정하기
  // useEffect(()=>{


   

    // ((중요))
    // 특정이벤트를 설정해제하고자 할 때
    // 반드시 그 이벤트 설정은 JS파일 내부에서 하지 말고
    // 리액트 함수에서 JS 함수를 호출하는 형태로 해야
    // 해제 메서드인 removeEventListener 가 유효함


    // 메인페이지인 경우///
    // if(pgName =='main'){
    // 휠이벤트 적용하기
    // window.addEventListener('wheel',wheelFn);
    // 메뉴이벤트 설정함수
    // evtFn();
    // }
    // 기타 서브페이지인 경우///
    // else{
      // 휠 이벤트 헤제하기
      // window.removeEventListener('wheel',wheelFn);
      // 익명함수는 해제 안 됨 > 함수 이름이 있어야지 지우기 가능 ()=>{} 이렇게 바로 쓰는경우 안 됨
    // }


  // }); ///useEffect ///////




  //// 리턴코드 /////////
  return(
  <pCon.Provider value={{pgName,chgPgName}}>
        <TopArea cat={pgName} />        
        <MainArea page={pgName} />
        <FooterArea />
  </pCon.Provider>
  );

} ///////////// App 컴포넌트 /////////////

/* 
<button onClick={()=>chgPgName('main')}>
  메인페이지
</button>
<button onClick={()=>chgPgName('men')}>
  남성페이지
</button>
<button onClick={()=>chgPgName('women')}>
  여성페이지
</button>
<button onClick={()=>chgPgName('style')}>
  스타일페이지
</button>
*/

// 출력하기 ///////
const root = createRoot(document.querySelector('#root'));
root.render(<App />)