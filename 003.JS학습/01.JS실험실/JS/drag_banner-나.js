//JS실험실 : 10 드래그배너 JS - drag_banner.js

// DOM 메서드
import dFn from './dom.js';
console.log(dFn)




// 슬라이드 대상요소 : .banbx
const banBox = dFn.qsa('.banbx');
console.log(banBox);

//슬라이드 만큼 모두 호출하기
banBox.forEach(ele=>{

  //슬라이드함수 호출하기
  slideFn(ele);
  //

});

/***************************************************** 
    [ 슬라이드 이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(.slide)
    4. 기능 설계:

        (1) 오른쪽 버튼 클릭시 다음 슬라이드가
            나타나도록 슬라이드 박스의 left값을
            -100%로 변경시킨다.
            -> 슬라이드 이동후!!! 
            바깥에 나가있는 첫번째 슬라이드
            li를 잘라서 맨뒤로 보낸다!
            동시에 left값을 0으로 변경한다!

        (2) 왼쪽버튼 클릭시 이전 슬라이드가
            나타나도록 하기위해 우선 맨뒤 li를
            맨앞으로 이동하고 동시에 left값을
            -100%로 변경한다.
            그 후 left값을 0으로 애니메이션하여
            슬라이드가 왼쪽에서 들어온다.

        (3) 공통기능: 슬라이드 위치표시 블릿
            - 블릿 대상: .indic li
            - 변경 내용: 슬라이드 순번과 같은 순번의
            li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/


/****************************************** 
 함수명:slideFn
 기능: 로딩 후 버튼 이벤트 및 기능구현
 ******************************************/
function slideFn(selEl) { //selEl 은 선택 슬라이드 부모 요소
  console.log("슬라이드함수 호출확인!");

  // 1. 광클금지상태변수 - 0은 허용, 1은 불허용
    let clickSts = 0;
    
  // 2. 슬라이드 이동시간 : 상수로 설정
  const TIME_SLIDE = 400;
  
  /* 
  
      (참고: JS에서 이름짓는 일반규칙)
      1. 변수/함수 : 캐멀케이스(첫단어 소문자 / 뒷단어 대문자 시작)
      2. 생성자함수/클래스 : 파스칼케이스(모든첫글자 대문자)
      3. 상수: 모든글자 대문자(연결은 언더스코어 - 스네이크 케이스   ex)TIME_SLIDE)
  
  */
  




    //1.대상선정
    const sldWrap = selEl;   //DOM요소를 직접 받음

    // 변경대상 전달된 선택요소- > selEl
    const slide = dFn.qsEl(sldWrap, '.slide');

    // 이벤트대상: .abtn
    const abtn = dFn.qsaEl(sldWrap, '.abtn');
   
    // 블릿박스 대상:
    let indic = dFn.qsEl(sldWrap,'.indic');

    console.log('대상:',abtn,slide,indic);


    // 1.4 슬라이드 개수와 동일한 블릿 동적생성
    // 대상: .indic -> indic변수
    // 슬라이드 개수
    let sldCnt = dFn.qsaEl(slide,'li').length;

  // for문으로 블릿 li생성(0번만 on넣기)
    for(let i=0; i<sldCnt; i++){


      indic.innerHTML += `
      <li ${i==0?'class="on"':''}>
      <img src="images/dot1.png" alt="흰색">
      <img src="images/dot2.png" alt="회색">
      </li>
      `;



    } ///for/////


    //블릿 li 재선택 할당하기//
    indic = dFn.qsaEl(sldWrap,'.indic li');



    // 1.5 li리스트에 순번속성 만들어 넣기
    // 만드는 이유: 블릿변경 등에 현재슬라이드 순번 필요
    // 사용자 정의 속성은 반드시 'data-'로 시작해야함 (W3C규칙)
    // data-seq 로 순번 속성을 넣을 것임
    slide.querySelectorAll('li').
    forEach((ele,idx)=>{ele.setAttribute('data-seq',idx)});
    //setAttribute(속성명,속성값) -> 속성셋팅 JS내장 메서드

    // console.log(ele,idx);


    // 2. 이벤트 설정하기
    /*   abtn.forEach(ele=>{
        addEvt(ele,'click',goSlide);
    }) */
    abtn.forEach(ele=>dFn.addEvt(ele,'click',goSlide));

    // 3. 함수만들기 : 버튼요소들 forEach

    function goSlide(){


      //a요소 기본이동 막기
      event.preventDefault();

        //광클금지
        if(clickSts) return; //나가
        clickSts=1; //잠금
        setTimeout(()=>clickSts=0,TIME_SLIDE); //해제

     
        // console.log('나야나',this,this.classList.contains('ab2'));

        //classList.contains(클래스명)
        // 선택요소에 해당 클래스가 있으면 true 없으면 false

        //1. 오른쪽 버튼 여부 알아내기
        let isRight = this.classList.contains('ab2');
        console.log('디스디스',this);

        //2. 슬라이드 li 새로 읽기
        let eachOne = slide.querySelectorAll('li');


        //3. 버튼분기하기 '.ab2' 이면 오른쪽 버튼
        if(isRight){ //오른쪽버튼

            rightSlide();

        }///if /////////////

        else{ //왼쪽버튼
            //1. 맨뒤 li 맨앞으로 이동
            //놈.놈.놈 -> insertBefore(넣을놈,넣을놈전놈)
            slide.insertBefore(eachOne[eachOne.length-1],eachOne[0]);

            //2. left값 -330%만들기 :들어올 준비 위치
            // slide.style.left = '-330%';
            //rx는 드래그 시 이동한 수치임(보정해야 안튐)
            slide.style.left = -(slide.parentElement.clientWidth*3.3-rx)+'px';
            console.log('rx보정값',rx);

            // 이동후엔 rx=0으로 초기화 해야 버튼클릭 시 정상작동함



            //3. 트랜지션 없애기
            slide.style.transition = 'none';
            
            //같은 left값을 동시에 변경하면 효과가 없음
            //비동기적으로 처리해야 함
            //->setTimeout으로 싸주기
            //시간은 0이어도 비동기 처리므로 효과있음

            setTimeout(()=>{
            //3. left값 -220%으로 들어오기
            slide.style.left = '-220%';
    
            // 4. 트랜지션 주기
            slide.style.transition = TIME_SLIDE+'ms ease-in-out ';

            // 드래그 보정값 rx 초기화
            rx=0;

            },0);


        } ////else//////

        // 4. 블릿순번 변경 함수 호출
        chgIndic(isRight);  //방향값을 보냄

        // 5. 자동넘김 멈춤함수 호출하기
        clearAuto();

     
        }///goSilde함수 ////////



        //슬라이드 오른쪽 방향 함수////
        function rightSlide(){

          // 슬라이드 이동전 먼저 잘라낸다
          // 이유: 슬라이드 순서를 왼쪽 이동과 동일하게 하여
          // 중앙확대 트랜지션 순번적용이 같아지게 한다

          // 맨앞 li 맨뒤로 이동
          //appendChild(요소)
          slide.appendChild(slide.querySelectorAll('li')[0]);
          // slide left값 -110%
          slide.style.left = '-110%';

          //rx는 드래그 시 이동한 수치임(보정해야 안튐)
          slide.style.left = -(slide.parentElement.clientWidth*3.3-rx)+'px';
          console.log('rx보정값',rx);
    

          // 트랜지션 없애기
          slide.style.transition = 'none';

          setTimeout(()=>{
              //대상이동하기
              slide.style.left = '-220%';
              //트랜지션주기
              slide.style.transition = TIME_SLIDE+'ms ease-in-out';
              // 이동시간 후 맨앞 li요소 잘라서 맨 뒤로 이동하기
            }, 0);

           }////rightSlide함수///



 

    //블릿순번 변경 함수///
    function chgIndic(isRight){ // isright(0왼쪽/1오른쪽)

        // 슬라이드 순번과 일치하는 블릿에 클래스 넣기
        // 대상 : .indic li -> indic변수
        // 맨앞 슬라이드 li의 'data-seq'값 읽어오기
        // isRight값이 true이면 오른쪽 버튼이고 순번은 [1]
        // isRight값이 false이면 왼쪽 버튼이고 순번은 [0]



        let nowSeq = slide.querySelectorAll('li')[isRight?1:0].getAttribute('data-seq');
        console.log('현재슬라이드순번',nowSeq);

        //해당순번 블릿li에 클래스 on넣기
        //블릿전체순회시 해당순번에 on넣고 나머지는 on빼기
        indic.forEach((ele,idx)=>{
            if(idx==nowSeq) ele.classList.add('on');
            else ele.classList.remove('on');


        }); /////////////forEach///////////

        
    }/////chgIndic함수//////


    /*************************************** 
        자동넘기기 기능구현
        ->일정 시간 간격으로 오른쪽 버튼 클릭
        ->사용 JS내장함수 : setInterVal()
        ->버튼클릭 실행 메서드 : click()
        대상: 오른쪽버튼 - .ab2 -> abtn[1]
    
    ***************************************/
    //인터발변수
    let autoI;
    //인터발 타이밍 함수를 변수에 할당 후 
    //clearInterVal (할당변수)해야 멈출 수 있다

    //타임아웃변수
    let autoT;
    //타임아웃 함수도 마찬가지임
    // clearTimeout(할당변수) 해야 실행 쓰나미를 막을 수 있다



    //인터발호출 함수
    function slideAuto(){
        autoI = setInterval(() => {
            // 오른쪽 이동 슬라이드 함수 호출
            rightSlide();
            // 블릿변경함수호출( 오른쪽은 1)
            chgIndic(1);


            // console.log('실행');
            // 오른쪽버튼 클릭이벤트 강제발생
            // 선택요소.click()
            // abtn[1].click();
     
        }, 3000);

    }///slideAuto함수/////

    // 인터발함수 최초 호출
    // slideAuto();
  

    // 버튼을 클릭할 경우를 구분하여  자동넘김을 멈춰준다
    function clearAuto(){
        console.log('멈춤');

         //자동넘김 지우기
        //clearInterval(인터발할당변수)

        //1.인터발 지우기
        clearInterval(autoI);
        //2.타임아웃 지우기 (재실행호출 쓰나미 방지)
        clearTimeout(autoT);
        //일정시간 후 다시 인터발호출 셋팅하기
        // autoT = setTimeout(slideAuto,2000);
        //결과적으로 5초후 인터발재실행은 하나만 남는다
        
    }///clearAuto함수/////



} 

/////////////////////////////////////////////

/******************************************  
  [ 드래그 다중적용 함수 만들기 ]
  함수명 : goDrag
  기능 : 다중 드래그 기능 적용
******************************************/


//1. 대상 선정 :dtg는 slide와 일치
const dtg = dFn.qsa('.dtg');
//2. 드래그 설정하기
dtg.forEach(ele=>goDrag(ele));



// (5) 위치이동 차이 결과 변수: result x
let rx = 0;



function goDrag(ele){ // ele 드래그 대상요소: .slide
  

  //2. 변수 셋팅
  // (1) 드래그 상태병수 : true면 - 드래그 중 / false - 드래그 아님
  let drag = false;
  // (2) 첫번째 위치 포인트 first x, first y
  let fx, fy;
  // (3) 마지막 위치 포인트 last x, last y
  // 처음 위치는 슬라이드 최초 left위치값으로 읽어옴
  let lx = ele.offsetLeft, ly = 0;
  // -> 마지막위치로부터 처음 작동하므로 초기값 0 셋팅
  // (4) 움직일 때 위치 포인트 : move x , move y
  let mvx, mvy;
  // (5) 위치이동 차이 결과 변수: result x, result y
  //let rx, ry; => 위치이동차이값은 슬라이드 오른쪽 이동시
  //보정값으로 함수 바깥에 선언하여 공유한다


  //3. 함수 만들기 //////
  //(1) 드래그 상태 true로 변경함수
  const dTrue = () => drag = true;

  //(2) 드래그 상태 false로 변경함수
  const dFalse = () => drag = false;





  //(3) 드래그 움직일 때 작동함수
  const dMove = (e) => {
    // console.log('드래그상태',drag);

    //드래그 상태일때만 실행
    if(drag){
      // 0. 슬라이드의 드래그 상태일때는 트랜지션을 없앰
      ele.style.transition = 'none';

      // 1. 드래그 상태에서 움직일 때 위치값 : mvx, mvy
      // -pageX,pageY는 일반 브라우저용
      // touches[0].screenX,touches[0].screenY는 터치 스크린용
      mvx = e.pageX || e.touches[0].screenX;
      // mvy = e.pageY || e.touches[0].screenY;


      // 2. 움직일 때 위치값 - 처음위치값 : rx, ry
      // x축값은 left값, y축값은 top값이동이다
      rx = mvx - fx;
      // ry = mvy - fy;


      // 3. x,y 움직인 위치값을 타겟요소에 적용
      // 대상: 전달된 요소 드래그 요소 
      ele.style.left = (rx+lx) +'px';   //()있어도 되고 없어도 됨
      // ele.style.top = ry + ly + 'px';

    

      // 한번 드래그 후 다시 드래그 시 움직인 위치값이 필요함
      // 마지막 위치값 저장 필요 lx ly
      // 항상 최종 위치에서 움직인 위치를 더한다


      // 4. z-index값을 모두 초기화 후 드래그 대상만 높여줌
      dtg.forEach(ele=>ele.style.zIndex=0);
      ele.style.zIndex = 1;

      // 5. 마우스 포인터 쥔손 모양 변경하기
      ele.style.cursor = 'grabbing';


      //값확인
      // console.log(`fx:${fx} | fy:${fy}`);
      // console.log(`mvx:${mvx} | mvy:${mvy}`);
      // console.log(`rx:${rx} | ry:${ry}`);
      // console.log(`lx:${lx} | ly:${ly}`);
      // console.log(`left:${rx+lx} | top:${ry + ly}`);


    }///if////////////

    // 커서 편손(grab)/쥔손(grabbing) 상태 변경하기
      ele.style.cursor = drag?'grabbing':'grab';
    
  }; //////dMove함수 /////////





  //(4) 첫번째 위치포인트 셋팅함수 : fx, fy
  const firstPoint = (e)=>{
    fx = e.pageX || e.touches[0].screenX;
    // fy = e.pageY || e.touches[0].screenY;

    // console.log('첫포인트:', fx,'|', fy);
  }; ///firstPoint 함수//////////




  //(5) 마지막 위치포인트 셋팅함수 : lx, ly
  const lastPoint = ()=>{
    // 움직일 때 위치값을 기존값에 계속 더함
    lx += rx;
    // ly += ry;
    // console.log('끝포인트:', lx,'|', ly);
  }; ///lastPoint 함수//////////




  //4. 이벤트 등록하기 ///////////
  //대상 : 호출시 보내준 드래그 대상 요소 -> ele 변수
  //(1) 마우스 내려갈 때  : 드래그 true + 첫번째 위치값 업데이트
  dFn.addEvt(ele,'mousedown',(e)=>{
    dTrue();
    firstPoint(e);
    
  }); ///////// mousemove함수 ///////

  
  dFn.addEvt(ele,'touchstart',(e)=>{
    dTrue();
    firstPoint(e);
  }); ///////// touchstart 함수 ///////
  //모바일 이벤트




  //(2) 마우스 올라올 때  : 드래그 false + 마지막 위치값 업데이트
  dFn.addEvt(ele,'mouseup',()=>{
    dFalse();
    // lastPoint();
    // 슬라이드 드래그는 마지막 위치 없데이트 불필요
    //왜 자유 드래그와 달리 슬라이드는 마지막에 항상 특정위치에 가있기 때문
    //중간에 업데이트를 하면 슬라이드가 튐

    //드래그 이동 판별함수 호출 : ele -> 선택한 슬라이드
    goWhere(ele);
  }); ///////// mousemove함수 ///////

  dFn.addEvt(ele,'touchend',()=>{
    dFalse();
    lastPoint();
    //드래그 이동 판별함수 호출 : ele -> 선택한 슬라이드
    goWhere(ele);
  }); ///////// touchend 함수 ///////
  //모바일 이벤트





  //(3) 마우스 움직일 떄 : 움직일 때 처리함수 호출
  dFn.addEvt(ele,'mousemove',dMove);
  dFn.addEvt(ele,'touchmove',dMove);  //모바일 이벤트

  
  //(4) 마우스 벗어날 때 : 드래그 상태 false
  dFn.addEvt(ele,'mouseleave',dFalse);


} ////// goDrag 함수/////////////


/*********************************************** 

함수명 : goWhere
기능 : 드래그 시 왼쪽/오른쪽 이동 판별
호출 : 드래그 시 mouseup/touchend 이벤트에서 호출

***********************************************/
function goWhere(target){
  //target 드래그 대상 (슬라이드 요소)
  // 1. 현재드래그 대상 left 위치값 
  let tgLeft = target.offsetLeft;

  
  // 2. 기준 위치값 : 부모박스를 기준한 -220%의 레프트 위치값
  let pointLeft = target.parentElement.clientWidth * 2.2;
  //2.2 > 220%
  
  console.log('슬라이드Left:',tgLeft,'\n기준Left:',-pointLeft);

  // 3. 방향판별하기: 기준값에 특정값을 더하고 뻄
  // 3-1. 왼쪽방향이동(오른쪽버튼 클릭과 동일)
  if(tgLeft < -pointLeft - 50){
    console.log('왼쪽');
    //오른족버튼 클릭이벤트 발생하기
    //상대적으로 현재 위치에서 찾음
    
    dFn.qsEl(target.parentElement,'.ab2').click();

  }
  else if(tgLeft > -pointLeft + 50){
    console.log('오른쪽');
    dFn.qsEl(target.parentElement,'.ab1').click();
  }
  //3-3. 중간영역은 제자리로 돌아옴
  else{
    console.log('제자리')
    target.style.left = '-220%';
    target.style.transition = 'left .2s ease-in-out';
  }


}////////// goWhere함수 ////


