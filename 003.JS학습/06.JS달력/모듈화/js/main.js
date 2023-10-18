// 달력 컴포넌트를 부르는 메인 JS - main.js

// 달력 컴포넌트 불러오기
import Dalcom from "./calendar.js";



// 달력 컴포넌트 함수 호출하여 달력 셋팅하기
// 대상 : .dalcom1, .dalcom2

  
new Dalcom('.dalcom1');
const dc2 = new Dalcom('.dalcom2');
// 요구사항: 두번째 달력은 다음달 달력이 처음에 출력되게함
// 다음달 달력을 쓸 수 있게 이전/다음달 달력변경 내부함수를
// 생성자 함수에 this키워드로 등록하여 노출해야한다

dc2.chgCalender(1);

// 제이쿼리로 달력 컴포넌트를 사용할 때 
// 추가기능 구현하기

// 1. 대상: 달력 .calendar
const calBox = $(".calendar .main");
console.log(calBox);

// 2. 이벤트 설정하기: mouseenter
// - 마우스가 달력박스 안에 들어갔을 때 처리
//on(이벤트명,함수)
//-> 별도의 이벤트 메서드가 있다면 그것 사용
// calBox.on("mouseenter",fn)

calBox.mouseenter(function(){
  // this는 선택달력의 .main박스
  console.log('나달력',this);
  
  //선택달력 하위 .date를 클릭하면
  //히든필드 날짜정보 읽어오기
  $(this).find('.date').click(()=>{
    //제이쿼리는 value대신 val() 메서드
    // .main 다음요소가 input.date-info임
    let myData = 
    $(this).next().val();
    // console.log('날짜정보요소:',$(this).next());

    myData = myData.split('/');
    myData = myData[0]+'년 '+dc2.addZero(myData[1])+'월 '+dc2.addZero(myData[2])+'일 ('+dc2.week[myData[3]]+'요일)';


    // 출력: 해당달력의 부모의 이전 text박스
    $(this).parents('.calendar').parent().prev().val(myData);
    //parent() 한단계위의 부모요소
    //parents(특정요소) 부모들 중 특정요소

    
  });/// click ////

}); /// mouseenter ////


/// 달력 박스 보이기/숨기기 처리 //////////////
// 대상 : .calendar
const myCal = $('.calendar');

// 1. 보이기 : input박스를 클릭하면 보임
$('.dalcom input').click(function(){
  $(this).next().find('.calendar').show();
}); ///click ///

// 2. 달력 처음에 숨기기 + 떠날때 숨기기
myCal.hide().mouseleave(function(){
  $(this).hide();
});//mouseleave///