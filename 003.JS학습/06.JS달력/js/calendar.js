// 달력구현 JS _ calendar.js



/// DOM 메서드 ////////
const dFn = {
  qs: x => document.querySelector(x),
  qsEl: (el, x) => el.querySelector(x),
  qsa: x => document.querySelectorAll(x),
  qsaEl: (el, x) => el.querySelectorAll(x),
  
  cg : x => console.log(x)
};///////// dFn객체 ///////////////


// 달력함수 호출
makeDallyeok();


function makeDallyeok(){
 dFn.cg('달력만들어');

  // 1. 변수셋팅 ///////////////////////////////////
  // (1) 변경할 현재날짜 객체
  const currDate = new Date();
  // (2) 오늘날짜 객체
  const today = new Date();
  // (3) 년도요소 : .yearTit
  const yearTit = dFn.qs('.yearTit');
  // (4) 월요소 : .monthTit
  const monthTit = dFn.qs('.monthTit');
  // (5) 날짜요소 : .dates
  const dates = dFn.qs('.dates');

  // dFn.cg(yearTit);
  // dFn.cg(monthTit);
  // dFn.cg(dates);


  // 2. 함수만들기 ////////////////////////////////
  // (2) 달력 초기화 구성 함수
  const initDallyeok = () => {
    // 1. 전달 마지막 날짜(옵션:0) -> 달력처음 전달끝쪽 날짜표시



  }; ///// initDallyeok 함수//////////


}////////////////////////makeDallyeok 함수////////////////