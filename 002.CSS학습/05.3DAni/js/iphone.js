// 회전하는 아이폰 + 흐르는 글자 - iphone.js

//DOM 메서드
import dFn from './dom.js';




/************************************* 
  [ 아이폰 영역오버시 회전기능 ]
  1. 화면에 10등분된 투명 영역을 구현
  2. 이 영역이 이벤트 대상이 됨
  3. 오버시 변경대상인 아이폰에 회전값 변경
  4. 트랜지션으로 애니메이션 설정적용!
  5. 애니메이션 후에 이벤트박스를 보이게함
  (최초 width:0 -> width:100vw)
*************************************/




// 0.데이터 셋팅 : x,y축 회전각도를 배열에 셋팅
const iDeg = [
    //상단영역
    [30,-60,"mv1.jpg"],
    [30,-30,"mv2.jpg"],
    [30,0,"mv3.jpg"],
    [30,30,"mv4.jpg"],
    [30,60,"mv5.jpg"],
    // 중간영역
    [0,-60,"mv6.jpg"],
    [0,-30,"mv7.jpg"],
    [0,0,"mv8.jpg"],
    [0,30,"mv9.jpg"],
    [0,60,"pt1.jpg"],
    // 하단영역
    [-30,-60,"pt2.jpg"],
    [-30,-30,"pt3.jpg"],
    [-30,0,"pt4.jpg"],
    [-30,30,"pt5.jpg"],
    [-30,60,"pt6.jpg"],
  
]
/* const iDeg = [
    //상단영역
    [30,-60,"mv1.jpg",'alias'],
    [30,-30,"mv2.jpg",'all-scroll'],
    [30,0,"mv3.jpg",'help'],
    [30,30,"mv4.jpg",'n-resize'],
    [30,60,"mv5.jpg",'grabbing'],
    // 중간영역
    [0,-60,"mv6.jpg",'pointer'],
    [0,-30,"mv7.jpg",'progress'],
    [0,0,"mv8.jpg",'row-resize'],
    [0,30,"mv9.jpg",'text'],
    [0,60,"pt1.jpg",'wait'],
    // 하단영역
    [-30,-60,"pt2.jpg",'zoom-in'],
    [-30,-30,"pt3.jpg",'zoom-out'],
    [-30,0,"pt4.jpg",'progress'],
    [-30,30,"pt5.jpg",'grab'],
    [-30,60,"pt6.jpg",'move'],
  
]
 */

// 이벤트 박스에 속박스 넣기
const eBox = dFn.qs('.evt-box');
for(let i=0; i<15; i++){
  eBox.innerHTML += '<div></div>';
}






// 1. 대상선정
// 1-1. 이벤트 대상: .evt-box div
const evtBox = dFn.qsa('.evt-box div');

// 1-2. 변경 대상: .iphone
const iphone = dFn.qs('.iphone');

// 1-3. 스크린: #screen
const screen = dFn.qs('#screen');


console.log(evtBox,iphone,screen);






//2. 이벤트설정
evtBox.forEach((ele,idx)=>dFn.addEvt(ele,'mouseenter',()=>seeMe(idx)));


//3. 함수만들기
function seeMe(seq){
  console.log('나를봐',event.currentTarget,seq);

  iphone.style.transform = `rotateX(${iDeg[seq][0]}deg) rotateY(${iDeg[seq][1]}deg)`;

  iphone.style.transition = '.4s ease-out';

  screen.style.backgroundColor= `#fff`;
  screen.style.backgroundImage= `url(images/imgs_moving//${iDeg[seq][2]})`;


// 마우스 포인터 변경하기
// 대상: .evt-box  -> eBox
/* dFn.addEvt(eBox,'mouseover',()=>{
  console.log('마우스포인터');
  eBox.style.cursor = `${iDeg[seq][3]}`;
})

 */

}///////////seeMe함수/////////


// 이벤트 영역 박스 5초 후 작동되도록 width값 변경하기 //
setTimeout(() => {
  eBox.style.width = '100vw';

}, 3000);



////////////////////////////////////////////
// 마우스 포인터 변경하기! ///////////////////
// 대상: .evt-box -> eBox변수
dFn.addEvt(eBox,'mouseenter',function(){
    console.log('마우스 포인터바뀜');
    // 1. 이 박스범위안에서 커서 없애기
    this.style.cursor = 'none';  

    // 2. 커서박스 읽어와서 셋팅하기
    let cursorImg = dFn.qs('.cursor-box');
    cursorImg.style.position = 'fixed';
    cursorImg.style.width = '230px';
    cursorImg.style.height = '100px';
    cursorImg.style.background = 
    'url(./images/cat.gif) no-repeat 0/100% 100%';


    // 3.이 박스 범위에서 mousemove이벤트 발생시 커서 위치이동셋팅
    dFn.addEvt(this,'mousemove',(e)=>{
        cursorImg.style.top = e.pageY + 'px';
        cursorImg.style.left = e.pageX + 'px';
    });
    
}); /////////////// mouseenter 함수 ////////////


/*  

  [ 마우스 오버/아웃 관련 이벤트 차이점 ]
  1. mouseover / mouseout : 요소 자체 기준
  2. mouseenter / mouseleave  : 요소 경계선 기준
  -> 둘의 차이는 이벤트 버블링에 있다
  -> 경계선 기준의 이벤트인 mouseenter / mouseleave는 자체 요소에서만 발생하고
  버블링 되지 않는다
  -> 자손요소에서 버블링되어 발생하는 mouseover / mouseout으로 셋팅할 경우 빈번한
  이벤트 발생이 문제가 될 경우 mouseenter / mouseleave 를 사용할것을 w3c가 권고함

*/