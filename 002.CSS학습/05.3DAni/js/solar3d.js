// 3D 태양계 JS - solar3d.js /////

/**************************************** 
    [ 구현내용 ]
    - 축소확대 버튼 클릭시 표기된 배율만큼
    태양계전체를 축소/확대 적용한다!
    - 이때 클릭된 메뉴는 오버시 변경색을
    유지한다!
****************************************/


// 1. 대상선정
// 이벤트대상 : 축소 확대 메뉴 a 요소들
const menu = $('.tit2 a');

// 변경대상 :  태양계 전체를 싸고있는 부모요소 -> .scale-box
const scaleBox = $('.scale-box');

// 2. 이벤트 함수 셋팅
menu.on('click',function(){
    // 1. 배율 속성값 읽어오기 : data-num
    let scaleNum = $(this).attr('data-num');
    console.log('배율:',scaleNum);

    //2. 배율 적용하기
    scaleBox.css({transform:`scale(${scaleNum})`})


    // 3. 
    $(this).addClass('on').siblings().removeClass('on');

}); //click ////