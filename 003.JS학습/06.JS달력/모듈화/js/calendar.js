// 달력구현 JS _ calendar.js


/* ************************************************** 
[생성자 함수로 변환하여 사용하기]
  1. 함수명을 첫글자 대문자로 변경
    (생성자 함수로 사용할 것을 알림)
  2. 호출하는 곳에서 new 키워드로 인스턴스 생성
    -> 이때부터 생성자 함수로 사용하는것
  3. 만약 생성자 함수의 속성/메서드를 인스턴스 코딩구역에서
  활용하고자 할 경우
  this 키워드로 생성자함수 멤버등록하여 사용함
  -> 인스턴스 코딩구역에서 생성된 인스턴스를 변수에 담아
  하위 속성 또는 메서드로 호출 가능

  4. 유의사항: 생성자함수 내부에서 this키워드로 등록된 속성/메서드는
  내부에서 호출시에도 반드시 this키워드를 사용하여 호출해야함
***************************************************/


/// DOM 메서드 ////////
const dFn = {
  qs: (x) => document.querySelector(x),
  qsEl: (el, x) => el.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  qsaEl: (el, x) => el.querySelectorAll(x),

  addEvt : (ele, evt, fn) => ele.addEventListener(evt, fn),


  cg: (x) => console.log(x),

  addZero : x => x < 10? '0' + x : x,

  fm: (x) =>
    `${x.getFullYear()}-${
       dFn.addZero(x.getMonth() + 1)  //addzero쓴줄
    }-${x.getDate() < 10 ? "0" + x.getDate() : x.getDate()}(${
      week[x.getDay()]
    })`,

}; ///////// dFn객체 ///////////////

// 달력함수 호출 - 여기서 안 함
// makeDallyeok();


// 요일변경배열 ////
const week = ["일", "월", "화", "수", "목", "금", "토"];

// 함수명을 대문자로 시작하여 생성자 함수로 변환
function MakeDallyeok(selEl) {  // selEl 달력넣을요소
  dFn.cg("달력만들어");

  // 0.달력 컴포넌트 HTML 넣기
  dFn.qs(selEl).innerHTML =  insertHcode();

  this.week = ["일", "월", "화", "수", "목", "금", "토"];

  this.addZero = x => x < 10? '0' + x : x;

  // 1. 변수셋팅 ///////////////////////////////////
  // (1) 변경할 현재날짜 객체
  const currDate = new Date();
  // (2) 오늘날짜 객체
  const today = new Date();
  // (3) 년도요소 : .yearTit
  const yearTit = dFn.qs(selEl+" .yearTit");
  // (4) 월요소 : .monthTit
  const monthTit = dFn.qs(selEl+" .monthTit");
  // (5) 날짜요소 : .dates
  const dates = dFn.qs(selEl+" .dates");
  // (6) 날짜 넣을 배열 변수
  const dateSet = [];
  // (7) html 코드 저장변수
  let hcode = '';
  // (8) 날짜정보 히든필드
  const dateInfo = dFn.qs(selEl+' .date-info');


  // dFn.cg(yearTit);
  // dFn.cg(monthTit);
  // dFn.cg(dates);




  // 2. 함수만들기 ////////////////////////////////
  // (2) 달력 초기화 구성 함수
  const initDallyeok = () => {

    // 변수 초기화
    // 날짜 배열 초기화 : splice(시작순번,개수)
    // 배열변수.splice(0) 첫배열부터 모두지움
    dateSet.splice(0);
    //html 코드변수
    hcode = '';

    
    // 현재년
    let cYr = currDate.getFullYear();
    // 현재달
    let cMt = currDate.getMonth();

    // [선택달  끝날짜, 첫날짜 알아오기]
    // new Date(년도,월,옵션)
    // (1) 년도
    // (2) 월
    // (3) 옵션 : 0 - 선택달끝날짜 / 1 - 다음달첫날짜
  
    // 1. 전달 마지막 날짜(옵션:0)
    // -> 달력처음 전달끝쪽날짜표시
    const prevLast = new Date(cYr,cMt,0);

    dFn.cg('전달끝날짜:' + dFn.fm(prevLast));

    // 2. 현재달 첫째날짜(옵션:1 -> 전달로셋팅)
    // -> 달력 전달셋팅을 위한 요일 구하기 위해
    const thisFirst =new Date(cYr,cMt,1);

    dFn.cg('현재달 첫째날짜:'+ dFn.fm(thisFirst));

    // 3. 현재달 마지막 날짜 (옵션:0
    const thisLast = new Date(cYr,cMt+1,0);
    dFn.cg('현재달 마지막 날짜:'+ dFn.fm(thisLast));


    // 4. 년도표시하기
    yearTit.innerHTML = cYr;

    // 5. 월 표시하기
    monthTit.innerHTML = cMt + 1;

    // 6. 날짜 데이터 태그 구성하기
    // 6-1. 전달 날짜 앞쪽 채우기
    // 조건: 현재달 첫날짜 요일이 0이 아니면 내용 있음
    // 왜 0 인가? 0 일요일이므로 0이면 앞에 내용 없음

    let fDay = thisFirst.getDay();

    dFn.cg('이번달 첫날 요일:'+ fDay);

    

    if(thisFirst.getDay() !=0){
    
      //만약 요일번호가 0이 아니면 for문 돌림
      for(let i=0; i<fDay; i++){
        // 반복횟수 만큼 배열 앞쪽에 추가
        // 앞에 추가 메서드 : unshift()
        dateSet.unshift(`<span style="color:#ccc" class="bm">
          ${prevLast.getDate() - i}
        </span>`)
        //전달 마지막 날자 - for문 i값 (0,1,2,...)
      }///////////for///
            
      }///if////////


    //6-2. 현재월 삽입하기////////////////
    // 반복문 구성
    for(let i = 1; i<= thisLast.getDate(); i++){
      dateSet.push(i);
    }///////////for/////////////////
    

    // 6-3. 다음달 나머지 칸 삽입하기 ///////////
    // 다음달은 클래스 'am'dmfh rnqns
    // 반복구성 1부터 2주분량정도 넣는다
    for(let i = 1; i<= 14; i++){
      dateSet.push(`<span style="color:#ccc" class="am">${i}</span>`);
    }///////////for/////////////////



    // dFn.cg('날짜배열:'+dateSet);




    // 7. 날짜배열로 날짜태그 구성하여 출력하기
    // 7일 * 6주 = 42개
    
    for(let i = 0; i < 42; i++){
      //오늘 날짜와 같은 경우 클래스 'today'넣기
      if(
        // [ 년,월,일이 모두 일치하는 오늘만 표시 ]
        // (1) 오늘날짜 == 배열값날짜 AND
        today.getDate() == dateSet[i] && 
        // (2) 현재달 == 선택달 AND
        today.getMonth() == currDate.getMonth() &&
        // (2) 현재년도 == 선택년도
        today.getFullYear() == currDate.getFullYear()
      ){
        hcode += `<div class="date today">${dateSet[i]}</div>`
      } /// if///
      else{
        hcode += `<div class="date">${dateSet[i]}</div>`
      }///else///

     
    }//////////// for ///////////////


    //8. 날짜태그 출력하기
   
    dates.innerHTML = hcode;

    // dates.innerHTML = dateSet.map((v,i)=>
    // i<42?`<div class="date">${v}</div>`:'').join('');

    // dFn.cg(dates.innerHTML = dateSet.map((v,i)=>
    // i<42?`<div class="date">${v}</div>`:'').join(''));
    

    // 9. 날짜정보를 사용하도록 셋팅하기
    // (1)대상: .date => 위에서 새로 담겼으므로 새로 읽음

    let newDate = dFn.qsa(selEl+' .date');
    
    // console.log('뉴데이트',newDate);

    //(2) 각 날짜 요소에 링크 설정하기
    newDate.forEach(ele=>{
      dFn.addEvt(ele,'click',()=>{
        console.log('sss');
        //1. 년도읽기
        let nowY = yearTit.innerText;
        //2. 월읽기
        let nowM = monthTit.innerText;
        //3. 날짜읽기
        let nowD = ele.innerText;

        console.log(`${nowY}-${dFn.addZero(nowM)}-${dFn.addZero(nowD)}`);


        //4. 전달 다음달 구분하기
        let isSpan = dFn.qsEl(ele,'span');
        console.log('span있니',isSpan);

        //span이 있으면 true처리됨
        if(isSpan){
          //span의 클래스가 'bm' 'am'인지 구분하기
          let isAm = isSpan.classList.contains('am');
        
          if(isAm){//다음달이므로 1 더함
            nowM++;

            if(nowM==13) {
              //13월은 1월처리
              nowM = 1;
              //1월은 다음해로 처리
              nowY++;
            } ///if //
           }  

            else{ //'bm'일 경우 (전달)
              nowM--;
              if(nowM==0){
                //0월은 12월로 처리
                nowM=12;
                //12월은 전해로 처리
                nowY
             
            }
          }
        }//if//

        console.log(`${nowY}-${dFn.addZero(nowM)}-${dFn.addZero(nowD)}`);



        //[ 요일찍기 참고 ]
        // 날짜구성하기 : yyyy-mm-dd
        let setDate = `${nowY}-${dFn.addZero(nowM)}-${dFn.addZero(nowD)}`;
        // 요일셋팅하기
        let setDay = new Date(setDate).getDay()
        console.log(setDate+`(${week[setDay]})`);


        //히든필드에 날짜정보 넣기 : 다른데서 사용

        dateInfo.value =
        //활용도를 높이기 위해 / 넣기
        `${nowY}/${nowM}/${nowD}/${setDay}`;

        // setDate+`(${week[setDay]})`;
        

      }); ////// click 함수 ////////

    });/// forEach ///

  }; ///// initDallyeok 함수//////////

  



  // (2) 이전 /다음 달력 출력하기 함수 
  // 이전/다음달 함수는 this키워드로 생성자함수에 등록하여
  // 인스턴스 생성 시 접근할 수 있도록 한다
  this.chgCalender = (num) => {
    console.log('이전 달력 고고');

    // 이전달로 변경하여 initDallyeok() 함수호출
    // getMonth() 월 가져오기 /  setMonth() 월 셋팅하기
    currDate.setMonth(currDate.getMonth()+num);
    initDallyeok();


  }; ////chgCalender 함수 ///




  // 3. 이벤트 설정하기
  // 이전 버튼에 함수연결하기 : 달을 빼기위해 -1전달
  dFn.addEvt(dFn.qs(selEl+' .btnL'),'click',
  ()=>this.chgCalender(-1));
  // 다음 버튼에 함수연결하기 : 달을 더하기위해 1전달
  dFn.addEvt(dFn.qs(selEl+' .btnR'),'click',
  ()=>this.chgCalender(1));

  //this 키워드로 등록된 생성자함수 속성/매서드는 반드시 this 키워드를 사용하여 호출해야함


   // 초기셋팅함수 호출!
  initDallyeok();



} ////////////////////////makeDallyeok 함수////////////////





/************************************************  
  함수명: insertHcode
  기능: 달력의 HTML 코드넣기
************************************************/
function insertHcode(){
  // 달력 html코드를 리턴함
  return `
  <!-- 달력 전체박스 -->
  <div class="calendar">
    <!-- 달력상단:해당년/월표시 -->
    <header class="header">
      <!-- 달력이동버튼:이전 -->
      <button class="mbtn btnL">〈</button>
      <div class="title">
        <div class="yearTit"></div>
        <div class="monthTit"></div>
      </div>
      <!-- 달력이동버튼:다음 -->
      <button class="mbtn btnR">〉</button>
    </header>
    <!-- 달력날짜표시박스 -->
    <section class="main">
      <!-- 주단위 구분박스 -->
      <div class="week">
        <div class="day">Sun</div>
        <div class="day">Mon</div>
        <div class="day">Tue</div>
        <div class="day">Wed</div>
        <div class="day">Thu</div>
        <div class="day">Fri</div>
        <div class="day">Sat</div>
      </div>


      <!-- 해당월의 달력날짜 구성박스 -->
      <div class="dates"></div>


    </section>

    <!-- 달력날짜 저장용 히든필드 : type="hidden"  -->
    <input type="hidden" class="date-info">

  </div>

  `;

}///insertHcode함수////



// 달력 내보내기 ///
export default MakeDallyeok;