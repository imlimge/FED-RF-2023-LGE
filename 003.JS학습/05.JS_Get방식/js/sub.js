// JS 페이지간 데이터 전달하기 : 서브페이지 JS - sub.js

//넘어온 URL 파라미터 값 받기
//location.href를 오른쪽에 쓰면 상단의 url값을 읽어온다
let pm = location.href;


//기본 Get방식 파라미터의 물음표 시그널이 있는지 확인하여
//없으면 자르기 전에 첫페이지로 돌려보낸다
//indexOf('?') -> 물음표 문자열의 순번리턴
//찾는 문자열이 없으면 -1리턴  -> 존재 유무 판별

if(pm.indexOf('?')==-1){
  alert('비정상적인 접근입니다!');
  location.href='Get01.html';
}

// console.log(pm.indexOf('?')); 




//split(자를기준문자열) => 배열데이터가 됨
//?(물음표)로 잘라서 뒤에것
pm = pm.split('?')[1];

// =(이퀄) 로 잘라서 뒤에것
pm = pm.split('=')[1];

//인코딩 처리된 문자열 디코딩
pm = decodeURIComponent(pm);

// pm = decodeURIComponent(pm.split('=')[1]);
console.log('전달값', pm);


/// 데이터 셋업하기! //////
let sdata = {
  레드샵: {
      배경색: "red",
      이미지: "shop_red.jpg",
  },
  오렌지샵: {
      배경색: "orange",
      이미지: "shop_orange.jpg",
  },
  블루샵: {
      배경색: "blue",
      이미지: "shop_blue.jpg",
  },
  블랙샵: {
      배경색: "black",
      이미지: "shop_black.jpg",
  },
  그린샵: {
      배경색: "green",
      이미지: "shop_green.jpg",
  },
}; ///////// sdata객체 /////////////

console.log('매칭data:',sdata[pm]);


const tit = document.querySelector('#title');
const main = document.querySelector('#main');

tit.innerHTML = pm;
tit.style.backgroundColor = sdata[pm].배경색;

main.style.backgroundImage = `url(./images/${sdata[pm].이미지})`;


console.log(tit,main,sdata[pm].배경색);

