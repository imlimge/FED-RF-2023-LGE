// 아이스크림 갤러리 JS - icecream.js


$(()=>{ ////////////JQB /////////////
  // 요구사항: 아이스크림 갤러리를 드래그하여 
  // 이동시키며 양 끝에 이동한계를 설정한다

  // 1. 대상선정 : #move
  // - 아이스크림 리스트를 모두 담고있는 박스
  const target = $('#move');

  // 트랜지션 시간설정 변후
  const TRS_TIME_DT = '.4s ease-out';
  const TRS_TIME_MOB = '.3s ease-out';
  // 이징에 in들어가면 처음에 답답


  // 2. 변경내용 : 제이쿼리 UI 드래그 설정하기
target.draggable({
  axis:'x' //
})
//타겟에 트랜지션 설정
.css({
  transition: TRS_TIME_DT
});


// 한계값 설정하기 /////////////
// 화면크기 업데이트
const updateWin = () => $(window).width();
// 최초 윈도우 가로크기 업데이트
let winW = updateWin();
// 윈도우 리사이즈시 윈도우 가로크기 업데이트
$(window).resize(()=>{
  winW = updateWin();
  // console.log('업데이트화면 가로크기',winW)
  firstPoint = winW / 6 ;
  lastPoint = winW / 6;
  console.log('업데이트화면 한계값',firstPoint,'/',lastPoint)
  

});
// console.log('처음화면 가로크기',winW)



// 트랜지션 모바일 / DT 크기일 때 전환
// 위에서 설정하였으므로 만약 모바일 크기범위이면 아래값을 덮어씀
if(winW<500) target.css({transition:TRS_TIME_MOB});




// 첫번째 한계값 설정하기 : 화면크기의 1/3로 설정
let firstPoint = winW / 6 ;
console.log('첫번째 한계값',firstPoint)

// 마지막 한계값 설정하기
// 대상박스 width값 - 화면크기의 2/3
let lastPoint = target.width() - winW / 6;
console.log('마지막 한계값',lastPoint)



// 이벤트 발생 시 left값 체크하여 제한하기
// on(이벤트명,함수)
// -> 이벤트명을 띄어쓰기로 여러개 설정할 수 있다
// 기존 JS는 addEventListener()를 이벤트마다 등록해야했음
// 대상: html, body

// 동시에 이벤트 적용 할 수 있다
// $('html,body').on('click mouseover keydown',()=>{
 

// 마우스 왼쪽버튼 내려갈 때 : mousedown
// 마우스 왼쩍보튼 올라갈 떄 : mouseup
// 마우스 포인터 움직일 때 : mousemove

// > 모바일 터치 이벤트는 제이쿼리 터치펀치에서 처리함


$('html,body').on('mousedown mouseup mousemove',()=>{
  // 움직이는 대상 left 위치값
  let tgPos = target.offset().left;
  console.log('현재 left값',tgPos);


  if(tgPos > firstPoint){
    target.css({
      left:firstPoint+'px'
    });
  }

  // 마지막 한계값 체크하여 제한하기
  // left값이 마이너스 이므로 -lastPoint로 계산
  else if(tgPos < -lastPoint){
    target.css({
      left:-lastPoint+'px'
    });
  } 

})

}); ////////////JQB /////////////

