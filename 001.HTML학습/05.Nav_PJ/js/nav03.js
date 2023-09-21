//네비유형 03. nav03.js

// DOM 모듈 JS 불러오기
import dFn from './dom.js';


console.log(dFn);

//1. 요구사항분석 : 이미지가 있는 메뉴 마우스 오버시 이미지 변경하기
//2. 대상선정 : a.simg
const simg = dFn.qsa('.simg');

console.log(simg);

//3. 이벤트 설정
simg.forEach((ele)=>{

  dFn.addEvt(ele,'mouseover',()=>{
    //대상은 a요소 하위 두번째 이미지
    let target = dFn.qsaEl(ele,'img')[1];
    //하위 이미지 src 읽어오기
    let iscr = target.src;
    console.log('오버',iscr);

    //기존이미지 src의 '.png' -> '_on.png'로 replace하기
    target.src = iscr.replace('.png','_on.png');

   ele.style.color = 'red';

    console.log('오버',iscr);
  })


  dFn.addEvt(ele,'mouseout',()=>{

      //대상은 a요소 하위 두번째 이미지
      let target = dFn.qsaEl(ele,'img')[1];
      //하위 이미지 src 읽어오기
      let iscr = target.src;
      console.log('아웃',iscr);
  
      //기존이미지 src의 '.png' -> '_on.png'로 replace하기
      target.src = iscr.replace('_on.png','.png');
  
      ele.style.color = '';
  })


})