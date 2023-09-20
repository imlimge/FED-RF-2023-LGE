// 옷소매 갤러리 JS - main.js


// DOM함수
import dFn from './dom.js';


/* export default {
  // 요소선택함수 ////////
  qs: (x) => document.querySelector(x),
  qsEl: (el, x) => el.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  qsaEl: (el, x) => el.querySelectorAll(x),

  // 이벤트셋팅함수
  addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),

  // 바운딩위치값함수
  getBCR: (ele) => ele.getBoundingClientRect().top,

  // 옵셋탑값 반환함수
  getOT: (ele) => ele.offsetTop,
}; /////// domFn 객체 /////////////


 */



// 1. 기능정의 : 버튼 클릭 시 갤러리박스를 잘라서 앞/뒤로 이동함
// 1-1. 오른쪽버튼 클릭 시 - 맨앞div 맨뒤로 이동
// -> 갤러리 부모박스 .appendChild(맨앞자식 div)
// 1-2. 왼쪽버튼 클릭 시 = 맨뒤 div 맨앞으로이동
// -> 갤러리 부모박스 .insertBefore(맨뒤자식 div,맨앞자식 div)

// 2. 대상선정
// 2-1. 이벤트 대상 : .abtn(이동버튼들)
const abtn = dFn.qsa('.abtn');

// 2-2. 변경대상 : .gbx(갤러리 부모박스)
const gbx = dFn.qs('.gbx');
//console.log(abtn,gbx);

// 3. 이벤트 설정하기 ///////////////

abtn.forEach(ele=>{
  dFn.addEvt(ele,'click',goSlide);
  
})////forEach////////


// 광클금지변수(0-허용,1-금지)
let stsClick = 0;
const TIME_SLIDE = 400;


// 4. 함수만들기
function goSlide(){
  //0. 광클금지
  if(stsClick) return; //돌아가
  stsClick=1; //잠금
  setTimeout(() => stsClick=0, TIME_SLIDE);

  // 1. 버튼구분하기
  let isR = this.classList.contains('rb');
  
  console.log('하하하',this,isR);

  let newList = dFn.qsaEl(gbx,'div');

  // 2. 기능 분기하기
  // 2-1. 오른쪽버튼 : 맨앞div 맨뒤로 이동
  if(isR){
    gbx.appendChild(newList[0]);

  }///if///


  // 2-2. 왼쪽버튼 : 맨뒤 div 맨 앞으로 이동
  else{
    gbx.insertBefore(newList[newList.lenghth-1],newList[0])


  }//else///


}////////goSlide함수/////////


// 자동넘김용 호출함수 /////////////
const goRight = () => gbx.appendChild(dFn.qsaEl(gbx,'div')[0]);

// 자동넘김용 변수(인터발용:autoI,타임아웃용:autoT)
let autoI, autoT;

// 인터발호출함수 //////
const autoSlide = () => autoI = setInterval(goRight,3000);

// 인터발함수 최초호출
autoSlide();

// 인터발지우기함수 //////
const clearAuto = () => {
    // 인터발 지우기
    clearInterval(autoI);
    // 타임아웃 지우기
    clearTimeout(autoT);
    // 일정시간후 작동
    autoT = setTimeout(autoSlide,5000);
}; ////// clearAuto ///////

// 버튼 클릭시 clearAuto함수 호출하기
abtn.forEach(ele=>dFn.addEvt(ele,'click',clearAuto));