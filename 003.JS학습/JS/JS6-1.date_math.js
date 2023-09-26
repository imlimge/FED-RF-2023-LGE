// JS6-1.Date객체와 Math객체

//DOM 함수 모듈
import dFn from "./dom.js";

// 1. 요구사항 : 화면에 시간을 찍으시오
// 2. 대상: .tt
const tt = dFn.qsa(".tt");
console.log(tt);

/**************************************************
    함수명 : showTime
    기능: 시간을 1초간격으로 보여줌
**************************************************/

const week = ["일", "월", "화", "수", "목", "금", "토"];

////////////////////// 시간 찍기 ////////////////////////
// -> 시간은 보통 한자리 숫자일 때 앞에 0자리 표시 함
// 01, 02 .... -> 이것은 숫자가 아니고 문자임

// 앞에 0 자릿수를 추가하는 함수만들기
const addZero = (num) => (num < 10 ? "0" + num : num);

// 인터발호출하기
setInterval(showTime, 1000);

//최초호출
showTime();

function showTime() {
  // 3. 시간찍기
  // JS시간날짜 객체 : date() 객체
  const today = new Date();
  // new 키워드로 내장객체의 인스턴스를 생성함

  // 3-1. 년도 찍기 : getFullYear()
  tt[0].innerText = today.getFullYear();
  // 참고 :  getYear()는 1900년을 뺀 년도가 나옴

  // 3-2. 월 : getMonth()
  // let monthName = ["ㅇ","ㅁ","ㄷ","ㄹ","ㅎ","ㅅ","ㄱ","ㅋ","ㅌ","ㅂ","ㅊ","ㅍ"];
  // tt[1].innerText = monthName[today.getMonth()];
  // 각나라마다 부르는 월의 이름을 설정 가능

  tt[1].innerText = today.getMonth() + 1;
  // 찍어보면 기본달보다 1작다
  // 이것은 배열순번에 넣고 찍기 좋도록 월 순번이 리턴된다
  // 따라서 숫자월을 찍고싶으면 +1함

  // 3-3. 일 : getDate()
  tt[2].innerText = today.getDate();
  // 날짜는 그대로 숫자로 리턴됨

  // 3-4. 요일 : getDay()

  tt[3].innerText = week[today.getDay()];
  // 요일은 순번을 리턴함(0부터)
  // 각 나라별 요일을 배열로 넣고 출력하기 위해
  // 순번은 일요일부터 시작

  // 3-5. 시간출력 : getHours()
  let H = today.getHours();
  // 테스트용
  //H = 12;
  tt[5].innerText = addZero(H > 12 ? H - 12 : H);

  // 3-6. 오전/오후 출력
  // 기준은 12시 보다 크면 오후, 작으면 오전
  tt[4].innerText = H <= 12 ? "오전" : "오후";

  // 3-7. 분출력 : getMinutes();
  let M = today.getMinutes();
  //테스트
  //M = 7;
  tt[6].innerText = addZero(M);

  // 3-8. 초 :
  let S = today.getSeconds();
  tt[7].innerText = addZero(S);
} //////////showTIme/////////////////

/*************************************** 
    [ Math 객체 ]
    - 수학객체로써 다른 객체와 달리
    new키워드 없이 바로 사용할 수 있게 설계됨
    - 이런객체를 정적객체(Static Object)라고함
    -> 정적객체들!
        Array(), Object(), Math()
    ______________________________

    [ 주요 Math 객체의 메서드들 ]
    Math.min(값들) - 최소값
    Math.max(값들) - 최대값
    Math.round(실수값) - 반올림
    Math.floor(실수값) - 내림
    Math.ceil(실수값) - 올림
    Math.abs(양수나 음수값) - 절대값
    ______________________________

    Math.random() - 난수발생
    -> 0~1  사이의 소수점값 17자리수

***************************************/


// 난수 발생시키기
let rdm = Math.random();
console.log(rdm);


// 1~7사이 난수 발생하기
// 방법: 난수에 발생할 최대수 곱하기 -> 올림/내림

rdm = rdm*7;
console.log('난수*7',rdm);
console.log('난수*7 내림',Math.floor(rdm));
console.log('난수*7 올림',Math.ceil(rdm));
// -> 1부터 최대수는 올림처리
// -> 0부터 최대수 -1 은 내림처리


// 중간난수는?
// 예) 4부터 12 사이 난수는?

console.log('4~12사이 난수',Math.ceil(Math.random()*9) + 3);


/**************************************** 
  [ 내가 원하는 난수 만들기 ]

  1. 먼저 난수를 발생시킨다!
  Math.random()

  2. 1부터 원하는 최대수일 경우 최대수를 곱한다
  Math.random() * 최대수

  3. 원하는 범위의 난수를 올림처림함
  Math.ceil(Math.random() * 최대수)

  ________________________________

  [ 중간 범위의 난수 만들기 ]

  1. 1부터 최대수 랜던수를 먼저구한다
  Math.random() * 최대수

  2. 원하는 범위의 시작수 만큼 더함
  Math.ceil(Math.random() * 최대수) + 시작수만큼

  (만약 0부터 시작수로 하면 내림을 적용!
  -> Math.floor())
  ___________________________________

  예) 4~9 사이의 난수 구하기 : 1~6먼저구함
  -> 최대수는 6, 시작수 만큼 더할 수는 3
  Math.ceil(Math.random() * 최대수) + 시작수만큼
  Math.ceil(Math.random() * 6) + 3
  ________________________________

  [ 중간범위 수 계산 ]
  작은수 ~ 큰수
  1. 최대수 = 큰수 - 작은수 + 1
  2. 시작수차이 = 작은수 - 1;


****************************************/

//이미지 웹경로 배열
const rimg = ["https://img.etnews.com/photonews/2110/1461216_20211007085904_466_0001.jpg", "https://d2qqqnyszmt41w.cloudfront.net/wp-content/uploads/2021/04/23150534/202104231445162082.jpg", "https://img.imbc.com/adams/Program/202111/132804027350463581.jpg", "https://image.ytn.co.kr/general/jpg/2021/0925/202109251350012465_d.jpg"];


// 1. 요구사항 : 웹경로 이미지를 화면에 넣고 랜덤하게 
// 이미지를 칼라로 약간커지게 클래스 on을 주어서 변경함

// 2. 대상선정 : .imbx
const imbx = dFn.qs('.imbx');

// 3. 이미지 넣기
// 배열만큼 이미지 넣기
rimg.forEach(val=>{
  imbx.innerHTML += `
  
  <div>
    <img src="${val}" alt="드라마 이미지">
  </div>
  
  `;

}); ///forEach /////

// 랜덤처리 대상 선정 : .imbx div
const target = dFn.qsa(".imbx div");
console.log(target);




/************************************  
  함수명 : colorImg
  기능: 랜덤하게 선택 박스에 .on넣기
************************************/

//2초간격으로 인터발 호출

setInterval(colorImg,1500);


// 직전랜덤수 : 초기셋팅은  0 ~ 3 사이수가 아님수
let bNum = 5;   // 0~3 빼고 아무거나 넣엇음




// 랜덤수 범위: 0~3 (4개의 배열이르로)
function colorImg(){
  //난수만들기 : 0~3 -> 1~4를 만들고 내림처리
  let rdmNum = Math.floor(Math.random()*4);
  console.log('랜덤수',rdmNum);
  
  // 2. 직전 랜덤수와 같을 경우 다시 난수 발생하기
  // while(조건true){코드} 사용하기
  // 항상 직전랜덤수는 전역변수로 저장하고 매번 비교한다
  while(rdmNum==bNum){ //현재 랜덤수가 직전 랜덤수와 같냐
    
    //다시 랜덤 발생
    
    rdmNum = Math.floor(Math.random()*4); 
    console.log('다시 while 안에있는 랜덤수',rdmNum);


  }///while/////////////



  //while문을 빠져나온 경우 랜덤수가 확정이므로 이전 랜덤수로 저장하여 다음번에 비교할 수 있도록 한다

  bNum = rdmNum;

    //2. 대상에 클래스 on넣기
    //나머지는 빼기
    target.forEach((ele,idx)=>{

      if(idx==rdmNum)
      ele.classList.add('on');
      else
      ele.classList.remove('on');


    });//////forEach////////////

  }