// 쇼핑몰 배너 JS - 01.가로방향 배너 슬라이드 //


//Dom 모듈함수
import dFn from "./dom.js";




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
            slide.style.left = '-330%';
            //3. 트랜지션 없애기
            // slide.style.transition = 'none';
            
            //같은 left값을 동시에 변경하면 효과가 없음
            //비동기적으로 처리해야 함
            //->setTimeout으로 싸주기
            //시간은 0이어도 비동기 처리므로 효과있음

            setTimeout(()=>{
            //3. left값 -220%으로 들어오기
            slide.style.left = '-220%';

            // 4. 트랜지션 주기
            slide.style.transition = TIME_SLIDE+'ms ease-in-out';
            },0);


        } ////else//////

        // 4. 블릿순번 변경 함수 호출
        chgIndic(isRight);  //방향값을 보냄

        // 5. 자동넘김 멈춤함수 호출하기
        clearAuto();

     
        }///goSilde함수 ////////



        //슬라이드 오른쪽 방향 함수////
        function rightSlide(){

            //대상이동하기
            slide.style.left = '-330%';
            //트랜지션주기
            slide.style.transition = TIME_SLIDE+'ms ease-in-out';
            // 이동시간 후 맨앞 li요소 잘라서 맨 뒤로 이동하기
            //appendChild(요소)
            setTimeout(()=>{
                // 맨앞 li 맨뒤로 이동
                slide.appendChild(slide.querySelectorAll('li')[0]);
                // slide left값 -220%
                slide.style.left = '-220%';
                // 트랜지션 없애기
                slide.style.transition = 'none';
            }, TIME_SLIDE);

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
    slideAuto();
  

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
        autoT = setTimeout(slideAuto,2000);
        //결과적으로 5초후 인터발재실행은 하나만 남는다
        
    }///clearAuto함수/////



} 

/////////////////////////////////////////////

