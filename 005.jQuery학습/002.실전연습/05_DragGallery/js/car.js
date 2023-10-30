// 자동차 360도 회전뷰 JS

$(()=>{  /////////////////////JQB ////////////////

/***************************************************** 
  [박스에 드래그하여 이미지 변경하기]
  _________________________________________________

  원리 : 마우스 포인터 위치 중 x축 값만 이용하여
  처음찍은 위치와 드래그하여 마지막에 찍은 위치를 비교하여
  방향을 결정한 후 이전/다음 이미지로 순서대로
  넘겨서 자동차를 보여준다
*****************************************************/

// 0. 이미지 셋팅하기
// 이미지 박스 대상 : .cbx
const cbx = $(".cbx");
//console.log('대상',cbx);

// 이미지 셋업 : ./360view/country1.jpg
// 이미지 개수 : 50개

for(let i = 1; i<=50 ; i++){
  cbx.append(`
     <img src="./360view/country${i}.jpg" alt="car image">
  `)

} //// for //////


// 모든 이미지 숨기고 첫번째 이미지만 보이기
// 자동차 박스.찾아('img').숨겨().첫번째().보여()
cbx.find('img').hide().first().show()


// 1. 변수 셋팅하기
// (1) 드래그 상태병수 : 0 - 드래그 아님 , 1- 드래그 중
let drag = 0;

// (2) 클릭시 위치변수(드래그 시작점 - 실제 할당 값)
let point = 0;

// (3) 이벤트 발생 횟수 조절 변수 : 0-허용, 1-불허용
let protEvt = 0;


// 2. 드래그 이벤트 함수 설정하기

// (1)드래그 중 이벤트 함수
// 이벤트 종류 : mousemove - touchmove
cbx.on('mousemove touchmove', e=>{

  // 0. 이벤트 횟수 줄이기 : 광클금지원리와 같음
  if(protEvt) return; 
  protEvt = 1; // 잠금 - 이벤트 하나만 통과
  setTimeout(()=>protEvt=0,30);
  // 타임아웃 시간에 따라 이벤트수를 조절할 수 있다

  // 1. x축 위치값
  let pos = e.pageX || e.changedTouches[0].pageX;
  // e.changedTouches[0].pageX 모바일용 x축 위치값

  // 2. 방향알아내기
  // 계산방법 : 처음클릭위치 - 현재 위치
  // point 변수 - pos변수
  // 전제조건 : drag===1 일때만
  if(drag){
    // 방향변수
    let dir = point - pos < 0 ? 0 : 1;
    console.log('현재방향',dir)

    rotateCar(dir);
 
 
  } /// if ////

  
}); //////////// mousemove /////////


// (2) 드래그 상태 시작 이벤트 함수
// - 이벤트 종류 : mousedown - touchstart
cbx.on('mousedown touchstart',e=>{
  // 드래그 상태값 변경
  drag = 1;

  // x축 처음위치값 업데이트
  point = e.pageX || e.changedTouches[0].pageX;;

  // 커서 움켜쥔 모양
  cbx.css({
    cursor: "grabbing",
});

}); /////mousedown ///


// - 이벤트 종류 : mouseup - touchend
// 마우스가 나갈때도 해제처리해야 드래그 하다가 나갈대 괜찮음
cbx.on('mouseup mouseout touchend',e=>{
  //드래그 상태값 변경
  drag = 0;
  // 커서 움켜쥔 모양
  cbx.css({
    cursor: "grab",
});

}); /////mouseup ///


// 이미지 순번 변수
let fnum = 0;
// 이미지 박스의 이미지 
const carImg = cbx.find('img');

// (4) 이미지 순번 변경함수
const rotateCar = dir => { // dir 방향

  // [1 .fnum 증감전 숨기기 -> 현재이미지]
  carImg.eq(fnum).hide();

  // [ 2. 이미지 번호 증감처리]
  // dir 1이면 오른쪽에서 왼쪽 드래그 : 정방향
  // -> 사진번호가 증가
  // 1. 이미지 순번 증가 처리
  if(dir){
    fnum++;
    if(fnum==50) fnum=0;
    //마지막 순번은 49번이므로 50번에서 0으로 변경


  }///if///


  // dir 0이면 왼쪽에서 오른쪽 드래그 : 역방향
  // -> 사진번호가 증가
  // 2. 이미지 순번 감소 처리
  else{
    fnum--;
    if(fnum == -1) fnum = 49;
    // 첫순번은 0이므로 -1이면 마지막 순번 49번으로 변경
  }///else///

  console.log('순번:',fnum);
    
  // (다른방법:) 위에서 증감전 숨기기 안하고 아래서 하기
  // 1번 주석후 ->  carImg.eq(fnum).hide();
  // cbx.find('img:visible').hide(); 
  // 선택요소:visible은 display:none이 아닌요소 선택함
  // -> 반대로 display:none인 요소 선택은 :hidden


  // [3 .fnum 증감후 보이기 -> 다음 이미지]
  carImg.eq(fnum).show();


}; ///// rotateCar 함수 /////





}); /////////////////////JQB ////////////////