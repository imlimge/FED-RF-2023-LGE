// 영화 인트로 JS


// 애니메이션 클래스 적용 대상

// 1. 라인애니
const lineAni = $('.stage');

// 2. 스틸컷애니
const stcAni = $('#stc');

// 3. 로고애니
const logoAni = $('#mlogo');

// [2] 시차로 애니메이션 대상에 클래스 넣기
// 동통 적용 클래스 명 : anion
// 1. 2초 후 라인애니
setTimeout(() => {
  lineAni.addClass('anion');
}, 2000);

// 2. 3초 후 스틸컷애니 
setTimeout(() => {
  stcAni.addClass('anion');
}, 3000);

// 3. 4초 후 로고애니
setTimeout(() => {
  logoAni.addClass('anion');
}, 4000);



/* 오디오 컨트롤 하기 */

// 대상: .play-box
$('.play-box').hover(
  function(){ //over
    console.log('오버')
    //오버시 진한 이미지로 변경
    // 기존값 읽어오기
    let csrc = $('img',this).attr('src')
    //경로에서 '.png를 '-1.png'로 변경
    $('img',this).attr('src', csrc.replace('.png','-1.png'))

  },
  function(){ //out
    console.log('아웃')
    // 기존값 읽어오기
    let csrc = $('img',this).attr('src')
    $('img',this).attr('src', csrc.replace('-1.png','.png'))
  },
) //// hover ////


// 클릭 시 이미지 변경하기 + 오디오 재생/멈춤
.on('click',function(){
  // console.log('클릭이야');
  
  // 1. 오디오 요소 : 제이쿼리는 get(0)으로 요소를 선택
  const myAudio = $('.my-audio').get(0);

  // 재생시작시간 변경:값은 단위없이 숫자로 초단위
  myAudio.currentTime= 50;
  
  // 볼륨은 0~1 사이 소수점으로 표현(80%는 0.8)
  myAudio.volume = 1;
  

  
  // 2. 현재 오디오 멈춤여부 알아오기
  let isPaused = myAudio.paused;
  console.log('멈췄나',isPaused) 

  // paused 는 오디오/비디오 멈춤 여부를 리턴함
  // 멈춤상태면 true / 재생상태면 false

  // 3. 분기하여 처리하기
  // (1) 멈춤상태면 재생하기
  if(isPaused){


    // 재생하기
    myAudio.play();
    // 멈춤 버튼으로 변경
    $('img',this).attr('src','./images/vbt1-1.png')

  }/// if////
  // (2) 재생상태면 멈추기
  else{
    // 멈추기
    myAudio.pause();
    $('img',this).attr('src','./images/vbt2-1.png')

  } /// else ///

}); /// click ///



// setTimeout(() => {
//   lineAni.addClass('anion');

//   // 2. 4초 후 스틸컷애니 
//   setTimeout(() => {
//     stcAni.addClass('anion');

//     // 3. 6초 후 로고애니
//     setTimeout(() => {
//       logoAni.addClass('anion');
//     }, 2000);

//   }, 2000);

// }, 2000);
