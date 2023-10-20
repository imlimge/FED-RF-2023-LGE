



// JS함수 : 제이쿼리 코드를 실행하는 함수
function initFn(){

  //메인 이미지박스, 상품리스트박스 숨기기
  $('.img-box').css({opacity:0})
  .delay(1000).fadeTo(500,1);
  //fadeTo(시간,오파,이징,함수);  -> 투명도만 애니
  $('.gwrap').hide().delay(1500).slideDown(1000);

}////// initFn 함수 //////


//처음에 한번만 실행하는 JS 함수
function firstOneFn(){
  $('.tit').css({
    transform:"scale(2)",
    transition:"2s ease-out 1s"
  })
  setTimeout(() => {
    $('.tit').css({
    transform:"scale(1)"})

  }, 2000);

} /// firstOneFn ////


export {initFn,firstOneFn}