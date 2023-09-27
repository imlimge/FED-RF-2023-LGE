//  회전제어 JS2 //////////////

/************************************* 
    [구현내용]
    - 마우스 휠 이벤트에 따라 기본기능은
    막고 큐브를 회전하는 속성인 transform의
    rotateY(각도)의 값 변경을 이용한 큐브회전을 적용함
    -사용이벤트 : wheel
    -단위각도 : 360도 / 9개 = 40도
    -CSS이징적용 : ease-out

    [ 캐릭터별 고유번호 만들기 ]
    - 전역변수를 만들어 고유번호 저장
    - 스크롤 방향에 따른 고유번호 증감
    - 고유번호를 순환하여 항상 고정번호 만들기
    -> 9개니까 0~8까지의 고유번호가 순환한다


*************************************/


//DOM불러오기
import domFn from './dom.js';

//데이터 제이슨 불러오기
import mvData from './data_moving.json' assert{type:'json'};

// console.log(mvData);



// 0.변수셋팅
// 단위각도
const DEG = 40;
// 광휠상태변수(0-허용, 1-금지)
let stsWheel = 0;
// 휠제어시간
const TIME_WHEEL = 100;
// 휠단위수(휠 할 때 증감하는 수)
let numWheel = 0;
// 캐릭터 고유번호
let catNum = 0;
// 캐릭터 번호 한계수(9개니까 한계수 8 / 0~8)
const LIMIT_CNT = 8;
// 캐릭터 정보함수 호출 타임아웃용 변수
let autoT;



// 1. 대상선정 .cube
const cube = domFn.qs('.cube');
//console.log('대상',cube);

// 정보표시박스 :cat-info
const infoBox = domFn.qs('.cat-info');

// console.log('대상:',cube,infoBox);



// 2. 이벤트 설정하기
domFn.addEvt(window,'wheel',rotateMem);

// 3. 함수만들기 
function rotateMem(){

    // (0)휠 이벤트 발생수 조절하기 (광휠금지)
    if(stsWheel) return;   //막기
    stsWheel = 1; // 잠금
    
    setTimeout(()=>stsWheel=0,TIME_WHEEL); //해제

    // (1)휠방향 알아내기 : 휠델타
    let delta = event.wheelDelta;

    // (2)방향에 따른 회전각도 만들기
    if(delta<0){
        //휠단위수 증가
        numWheel--;
        //캐릭터 고유번호 증가(한계수 증가에서 0으로 순환)
        catNum++;
        if(catNum>LIMIT_CNT)catNum=0;

    }
    else{
        //휠단위수 감소
        numWheel++;
        //캐릭터 고유번호 감소(한계수에서 끝번호로 순환)
        catNum--;
        if(catNum<0)catNum=LIMIT_CNT;

    }
    
    console.log('휠',delta,numWheel,'캐릭터 고유번호',catNum);
    
    // (3)회전대상요소에 각도 적용하기
    // 적용각도 = 단위각도 * 휠단위수
    cube.style.transform = `rotateY(${numWheel*DEG}deg)`;
    
    console.log('적용각도',numWheel*DEG);
    //각도수가 무한히 올라가거나 내려가도 괜찮다
    


    // 4. 캐릭터가 정지한지 0.5초 후 정보를 셋팅함
    // 타임아웃 실행 쓰나미 방지 > 지우기 기능
    clearTimeout(autoT);
    // 0.5초후 캐릭터 정보 세팅함수 호출
    autoT = setTimeout(showInfo,500);

    //5. 기본 캐릭터 정보 박스 등장클래스 on 지우기
    infoBox.classList.remove('on');


}///rotateMem함수///


/************************************************** 
 함수명: showInfo
 기능: 캐릭터 정보를 화면에 표시한다
 **************************************************/
function showInfo(){
    console.log('보여줄게 캐릭터 데이터',mvData[catNum]);

    // 정보표시 박스에 h2,p요소 정보와 함께 넣기

    infoBox.innerHTML = `
    <h2>${mvData[catNum].name}</h2>
    <p>${mvData[catNum].desc}</p>
    `;


    //등장클래스 on주기
    infoBox.classList.add('on');

}//// showInfo 함수 ///////////////
