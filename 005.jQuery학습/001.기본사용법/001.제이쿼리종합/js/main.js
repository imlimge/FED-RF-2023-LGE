// 미니언즈 좀비 탈출 애니 구현 JS - main.js



/*********************************** 
    [ 요구사항정리 ]
    1. 버튼을 클릭하여 미니언즈가
    순서대로 특정위치로 이동하며
    메시지를 보여준다
    2. 각 위치별 좀비를 등장시킨다
    3. 맨윗층에서 탈출할때 헬기를 사용한다

    [ 변경대상 ]
    1. 주인공 미니언즈
    2. 좀비 미니언즈들
    3. 주사기
    4. 헬기

    [ 이벤트와 이벤트대상  ]
    1. 이벤트 : 클릭이벤트
    2. 이벤트대상 : 버튼들
    3. 기능구분 : 버튼글자(지시사항)

***********************************/


// 0. 주인공들 변수에 할당
// (1) 미니언즈
const mi = $('.mi');

// (2) 건물 li
const room = $('.building li');

// (3) 버튼들
const btns =$('.btns button');

// (4) 메세지박스
const msg = $('.msg');

// (5) 좀비, 주사기 요소 변수처리
let mz1 = `<img src="./images/mz1.png" alt="좀비1" class="mz">`;
let mz2 = `<img src="./images/mz2.png" alt="좀비2" class="mz">`;
let zom = `<img src="./images/zom.png" alt="좀비들" class="mz">`;
let inj = `<img src="./images/inj.png" alt="주사기" class="inj">`;

// (6) 메시지 배열셋팅
const msgTxt = [
  // 0번방
  `도와줘요!!!`,
  // 1번방
  `이제 곧 탈출이닷!`,
  // 2번방
  `이제 조금만 더<br>가면 탈출이닷!`,
  // 3번방
  `어서 윗층으로 가자!`,
  // 4번방
  [
    ['무','무.','무.서','무.서.','무.서.워','무.서.워.','무.서.워..','무.서.워..'],
    `아~악! 물렸다!<br>어서 치료주사방으로!`
  ],
  // 5번방
  "",
  // 6번방
  [`여긴없겠지?`,
  `그래도 무서우니<br>윗층으로 가자!`],
  // 7번방
  [`여긴없겠지?`,
  `악, 여기도!!!`],
  // 8번방
  "와~! 아늑하다!<br>옆방으로 가보자!",
  // 9번방
  "악 좀비 <br>어서 피하자",

];


// console.log('대상:',mi,room,btns,msg);

// 1. 건물 각 방에 번호넣기 + 좀비/주사기 넣기
// 대상: .building li -> room
// 사용 제이쿼리 메서드: 
// (1) each((순번,요소)=>{}) : 요소의 개수만큼 순서대로 돌아줌
// (2) append(요소) : 선택요소 내부에 자식요소 추가(이동)

room.each((idx,ele)=>{

  // console.log(idx,ele);
  // 1. 각 방에 숫자로 순번넣기
  $(ele).text(idx);

  // 2. 좀비/주사기 넣기
  switch(idx){
    case 9:
      $(ele).append(mz1);
      break;
      
    case 7:
      $(ele).append(mz2);
      break;

    case 2:
      $(ele).append(inj);
      break;

    case 1:
      $(ele).append(zom);
      break;

  } ///switch case /////


}); /// each 메서드 ////



// 좀비는 모두 숨기기
$('.mz').hide();

// 시간이 없는 hide()는 display:none처리함



// 2. 버튼 셋팅하기 //////////////
// 대상: .btns button -> btns변수

// 버튼들.숨겨().첫번째().보여()
btns.hide().first().show();
//==> 4번째가 보여
// btns.hide().eq(7).show();   


// 3. 미니언즈 공통 기능함수 ///////////
// (1) ele - 클릭된 버튼 요소
// (2) seq - 이동할 li방 순번
// (3) fn - 이동 후 실행할 코드(콜백함수)
const actMini = (ele,seq,fn) => {


      // 메시지 숨기기 + 버튼숨기기
      msg.fadeOut(300);
      //this는 클릭된 버튼 자신 -> ele로 전달
      $(ele).slideUp(400);


      // 원리 : 이동할 li방 위치값을 읽은 후 이동
      // 위치값 읽기: seq에 방번호를 보냄
      let myRoom = room.eq(seq);
      // 위치값 배열변수
      let pos = [];
      // top 위치값
      pos[0] = myRoom.offset().top;
      // left 위치값 : 방에서 중앙에 위치하도록 보정
      // left값+ 방width절반 - 미니언즈width절반
      pos[1] = myRoom.offset().left + myRoom.width() / 2 - mi.width() / 2;

      // 제이쿼리 위치값 정보 메서드 : offset() 
      //-> 하위속성 offset().top / offset().left
      //-> 제이쿼리 가로,세로 크기정보 메서드:
      //-> 가로 크기 width() / 세로크기 height()
      console.log(pos[0],'/',pos[1]);
      


      
      // 이동하기
      // 대상: .mi ->
      // animate({CSS설정},시간,이징,콜백함수)
      mi.animate({

        top: pos[0]+'px',
        left: pos[1]+'px',

      },800,"easeInOutElastic",
      //콜백함수

      fn


      ); //// animate ////////////////
};////////// actMini 함수 //////


// 다음버튼 보이기 함수////
const showNextBtn = (ele) => $(ele).next().delay(300).slideDown(400) ;
///showNextBtn 함수/////////////////////






// 4. "들어가기" 버튼 클릭 시 /////
btns.first() //첫번째버튼
    .click(
      function(){   //하위 이벤트 함수 this의미
      // ()=>{   // 이걸로 쓰면 하위 이벤트 함수가 나가서 this가 윈도우가 됨
     
        let fn = 
        // function(){   
        // -> this가 mi임
        ()=>{
        // -> this가 싸고있는 버튼 요소
        
        
          //메시지 변경 + 보이기
          msg.html(msgTxt[8])
          .delay(1000).fadeIn(300);
  
         
         
          console.log('미니언즈 콜백함수',this);
          // 다음버튼 보이기
          showNextBtn(this);
        }; //// 콜백함수


      //미니언즈 공통 호출
      actMini(this,8,fn);

      
      }) //// "들어가기" 버튼 끝 /////



    // 5. "옆방으로" 버튼 클릭 시 /////
    //위의 버튼에서 이어짐 >> ; 지우고 btns.sq(1)대신 next 씀 
    .next() //두번째버튼
    .click(
      function(){   //하위 이벤트 함수 this의미
      // ()=>{   // 이걸로 쓰면 하위 이벤트 함수가 나가서 this가 윈도우가 됨
     
        let fn = 
        // function(){   
        // -> this가 mi임
        ()=>{
          // 좀비 나타나기(2초후)
          room.eq(9).find('.mz').delay(1000)
          .fadeIn(400,()=>{
            // 콜백함수
            // 메시지 보이기
            msg.html(msgTxt[9]).css({left:"-89%"}).fadeIn(300)

            //다음버튼 보이기
            showNextBtn(this);
          }); ////fadeIn /////////////

        }; //// 콜백함수


      //미니언즈 공통 호출
      actMini(this,9,fn);

      }) //// "옆방으로" 버튼 끝 /////



    // 6. "윗층으로 도망가!" 버튼 클릭 시 /////
    //위의 버튼에서 이어짐 >> ; 지우고 btns.sq(1)대신 next 씀 
    .next() //세번째버튼
    .click(
      function(){   //하위 이벤트 함수 this의미
      // ()=>{   // 이걸로 쓰면 하위 이벤트 함수가 나가서 this가 윈도우가 됨
     
        let fn = 
        // function(){   
        // -> this가 mi임
        ()=>{
          //메시지 보이기
          msg.text(msgTxt[7][0]).fadeIn(300);

          //좀비 보이기 
          // find() 자손선택 / children() 직계자식선택
          room.eq(7).find('.mz').delay(1000)
          .fadeIn(400,()=>{//fadeIn 콜백함수 : 좀비 등장 후
            //메시지 변경하기 - 두번째 메시지
            msg.text(msgTxt[7][1]);

            //다음버튼 보이기
            showNextBtn(this);

          }); /// fadeIn ////

        }; //// 콜백함수


      //미니언즈 공통 호출
      actMini(this,7,fn);

      }) //// "윗층으로 도망가!" 버튼 끝 /////




    // 7. "다시옆방으로!" 버튼 클릭 시 /////
    //위의 버튼에서 이어짐 >> ; 지우고 btns.sq(1)대신 next 씀 
    .next() //네번째버튼
    .click(
      function(){   //하위 이벤트 함수 this의미
      // ()=>{   // 이걸로 쓰면 하위 이벤트 함수가 나가서 this가 윈도우가 됨
     
        let fn = 
        // function(){   
        // -> this가 mi임
        ()=>{
          // 첫번째 메시지 보이기
          msg.html(msgTxt[6][0]).fadeIn(200).delay(1000)
          // 이미 보이지만 delay()를 쓰기위해 다시 fadeIn()
          .fadeIn(200,()=>{  //두번 째 메시지 보이기
          
            msg.html(msgTxt[6][1]);
            //다음버튼 보이기
            showNextBtn(this);

          });/// fadeIn ////

        }; //// 콜백함수


      //미니언즈 공통 호출
      actMini(this,6,fn);

      }) //// "다시옆방으로!" 버튼 끝 /////


      
    // 8. "무서우니 윗층으로!" 버튼 클릭 시 /////
    //위의 버튼에서 이어짐 >> ; 지우고 btns.sq(1)대신 next 씀 
    .next() //다섯번째버튼
    .click(
      function(){   //하위 이벤트 함수 this의미
      // ()=>{   // 이걸로 쓰면 하위 이벤트 함수가 나가서 this가 윈도우가 됨
     
        let fn = 
        // function(){   
        // -> this가 mi임
        ()=>{
          // 무.서.워... 메시지 -배열배열배열
          msg.html(msgTxt[4][0][0]).fadeIn(200)
          .delay(300).fadeIn(200,()=>msg.html(msgTxt[4][0][1]))
          .delay(300).fadeIn(200,()=>msg.html(msgTxt[4][0][2]))
          .delay(300).fadeIn(200,()=>msg.html(msgTxt[4][0][3]))
          .delay(300).fadeIn(200,()=>msg.html(msgTxt[4][0][4]))
          .delay(300).fadeIn(200,()=>msg.html(msgTxt[4][0][5]))
          .delay(300).fadeIn(200,()=>msg.html(msgTxt[4][0][6]))
          .delay(300).fadeIn(200,()=>msg.html(msgTxt[4][0][7]))
          .delay(300).fadeIn(200,
            ()=>{ // 무서워 대사 후 좀비 올라와 달려들기
              // 7번방 좀비가 올라옴
              room.eq(7).find('.mz').animate({ 
                //윗층으로 올라옴 li 높이값 만큼
                bottom: room.eq(7).height()+'px'           
              },400,'easeOutElastic')
              .delay(300) // 기다림
              .animate({
                //right값을 li width값 만큼 이동(120% 보정)
                right: room.eq(7).width()*1.2 +'px'  
              },1000,'easeOutBounce',
              ()=>{ 
                

                // 미니언즈 좀비 이미지 흑백처리(1초후)
                setTimeout(() => {
                  mi.find('img')
                  .css({filter:'grayscale(100%)'});

                  //물린 후 대사
                  msg.html(msgTxt[4][1]).css({left:'-46%'});

                }, 1000); //// setTimeout ////


                // 미니언즈 좀비 이미지 변경(2초후)
                setTimeout(() => {
                  mi.find('img')
                  .attr('src','images/mz1.png')
            
                  //다음버튼 보이기
                  showNextBtn(this);
                }, 2000); //// setTimeout ////

              }); //// animate ///

            });/// fadeIn ////
     
        }; //// 콜백함수


      //미니언즈 공통 호출
      actMini(this,4,fn);

      }) //// "무서우니 윗층으로!" 버튼 끝 /////




      
      
    // 9. "치료주사방으로!" 버튼 클릭 시 /////
    //위의 버튼에서 이어짐 >> ; 지우고 btns.sq(1)대신 next 씀 
    .next() //다섯번째버튼
    .click(
      function(){   //하위 이벤트 함수 this의미
      // ()=>{   // 이걸로 쓰면 하위 이벤트 함수가 나가서 this가 윈도우가 됨
     
        let fn = 
        // function(){   
        // -> this가 mi임
        ()=>{
          //주사기 돌리기(animate는 트랜스폼 적용안 됨. 그래서 css로 적용)
          // $('.inj').css({
          //   transform:"rotate(-150deg)", //반시계방향
          //   transition:".5s .5s", // 0.5초 후 0.5초간 애니
          //   zIndex:"9999" //미니언즈보다 위
          // })

          $('.inj').css({zIndex:"9999"}).delay(500)
          .animate({rotate:"-150deg"},500,"easeInOutCirc"
          ,()=>{ // 주사기 회전 후 콜백함수
            //미니언즈 이미지 변경
            //attr(속성명,값) -> 값 설정하기
            //attr(속성명) -> 값 읽어오기
            mi.find('img').attr('src','images/m2.png')
            .css({filter:"grayscale(0)"})

            //주사기 없애기
            $(".inj").hide();

            //대사 2번째
            msg.html(msgTxt[2]).fadeIn(200);

            //댜음버튼 보이기
            showNextBtn(this);

          })//animate


        /* 
        jquery.rotate.js 는
        jQuery animate메서드에 transform rotate를 사용할 수 있도록 
        해주는 플러그인임!
        -> 제이쿼리 라이브러리 아래위치
        [ 사용법(animate css설정에 씀)-> rotate:"각도deg" ] 
        */


        }; //// 콜백함수

      //미니언즈 공통 호출
      actMini(this,2,fn);

      }) //// "치료주사방으로!" 버튼 끝 /////
      




      
    // 10. "3번방으로!" 버튼 클릭 시 /////
    //위의 버튼에서 이어짐 >> ; 지우고 btns.sq(1)대신 next 씀 
    .next() //다섯번째버튼
    .click(
      function(){   //하위 이벤트 함수 this의미
      // ()=>{   // 이걸로 쓰면 하위 이벤트 함수가 나가서 this가 윈도우가 됨
     
        let fn = 
        // function(){   
        // -> this가 mi임
        ()=>{
          //메시지 보이기
          msg.html(msgTxt[3]).fadeIn(200)
          //댜음버튼 보이기
          showNextBtn(this);

        }; //// 콜백함수


      //미니언즈 공통 호출
      actMini(this,3,fn);

      }) //// "3번방으로!" 버튼 끝 /////





      
    // 11. "1번방으로!" 버튼 클릭 시 /////
    //위의 버튼에서 이어짐 >> ; 지우고 btns.sq(1)대신 next 씀 
    .next() //여덟번째버튼
    .click(
      function(){   //하위 이벤트 함수 this의미
      // ()=>{   // 이걸로 쓰면 하위 이벤트 함수가 나가서 this가 윈도우가 됨
     
        let fn = 
        // function(){   
        // -> this가 mi임
        ()=>{
          //메시지 보이기
          msg.html(msgTxt[1]).fadeIn(200)
          //댜음버튼 보이기
          showNextBtn(this);

        }; //// 콜백함수


      //미니언즈 공통 호출
      actMini(this,1,fn);

      }) //// "1번방으로!" 버튼 끝 /////





      
    // 12. "헬기를 호출!" 버튼 클릭 시 /////
    //위의 버튼에서 이어짐 >> ; 지우고 btns.sq(1)대신 next 씀 
    .next() //아홉번째버튼
    .click(
      function(){   //하위 이벤트 함수 this의미
      // ()=>{   // 이걸로 쓰면 하위 이벤트 함수가 나가서 this가 윈도우가 됨
     
        let fn = 
        // function(){   
        // -> this가 mi임
        ()=>{
          //메시지 보이기
          msg.html(msgTxt[0]).fadeIn(200);

          // 1번방 단체좀비들 달겨들기
          room.eq(1).find('.mz')
          .fadeIn(400)
          .animate({right:room.eq(1).width()+"px"},3000,"easeInCirc");

          // 헬기등장
          $('.heli').animate({
            left:'25%',
            rotate:'20deg',
          },3000,"easeInOutQuart")
          .animate({
            left:'23%',
            rotate:'0deg',},500,"easeInOutCirc",
          function(){ //헬기이동완료 후 콜백함수
            //헬기 이미지 변경하기(this->fuction(){}사용시)
            $(this).attr('src','images/heli2.png');
            // 원본 미니언즈 사라지기
            mi.hide();
          })
          .delay(500)
          .animate({
            left:'70%', // 다시 오른쪽 끝으로
            rotate:'15deg'
          },4000,"easeOutExpo",
          function(){
            //끝쪽에서 조종사 좀비 바뀌는 이미지 변경
            $(this).attr('src','images/heli3.png');
          }).delay(300)
          .animate({
            left:'100%'
          },3000,'linear',
          ()=>{ //헬기 나간 후 콜백함수
            //간판떨어지기
            //1단계: 클래스 on 주기
            let tit = $('.tit')
            tit.addClass('on');
            //2단계: 클래스 on2주기
            setTimeout(() => {
              tit.addClass('on2');
            }, 3000);


            // 건물무너지기
            // -간판떨어진 후 (6초후)
            // 건물 흔들리기 클래스 on
            setTimeout(() => {
              room.parent().addClass('on');
              // parent()- > room은 아래 li까지 잡은거 부모요소인 .building으로 올라감
              // -> JS의 parentElement 와 유사함
            }, 6000);


          // 추가구현 : 시간(6초+건물기다리고 무너진시간 8초)+
          // 건물 무너진후 좀비 하나 올라와 오른쪽으로 사라지기
          setTimeout(() => {
            // 1.건물 기울기 원상복귀(이유: 좀비가 똑바로보이게)
            room.parent()
            .attr('style','transform:rotate(0deg) !important')
            // 2. 9번방 좀비
            room.eq(9).find('.mz')
            // (1) 지표로 올라오기(3초)
            .animate({bottom:"594%"},3000)
            // (2) 기다리기(3초)
            .delay(3000)
            // (3) 오른쪽으로 나가기(5초)
            .animate({
              right: '-240%'
            },5000,()=>{
              // 마지막 좀비 퇴장후 'THE END'화면 중앙보이기
              // body에 append 하여 태그 출력하기
              $('body').append(
                '<h1 class="ending">THE END</h1>');

              $('.ending').css({
                position:'fixed',
                top:'50%',
                left:'50%',
                transform:'translate(-50%,-50%)',
                margin:'0',
                padding:'0',
                color: 'white',
                fontSize:'20vh',
                textShadow:'0 0 5px #000',
                fontFamily:'vladimir script'
              })
              .hide() // 숨기기
              .fadeIn(1000) // 페이드애니로 보이기
              .animate({color:'red'},1000); // 글자색바꾸기애니

            }); /// animate ///

          }, 20000);

        }); /////////// animate //////////
      }; ////////// 콜백함수 /////////////



      //미니언즈 공통 호출
      actMini(this,0,fn);

      }); //// "헬기를 호출!" 버튼 끝 ///// - 모든 버튼 마무리



      //간판에 마우스 오버/아웃시 색상 변경하기
      //hover(함수1,함수2)
      //->오버시 함수1호출 , 아웃시 함수2 호출

      $('.tit').hover(
        function(){ //over
          $(this).css({
            backgroundColor:"blue",
            color:"cyan"
          });
        },
        function(){ //out
          $(this).css({
          backgroundColor:"pink",
          color:"yellow"
        })
      }); /// hover 메서드 ///
