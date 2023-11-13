// 배너 컴포넌트

// 배너데이터
import { banData } from "../data/banner";

// 배너 CSS
import "../../css/banner.css";
import { useEffect } from "react";
// 제이쿼리
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

// 슬라이드 기능 구현 함수
function slideFn() {
  // 1. 대상선정
  // 슬라이드
  const sldBox = $(".slider");

  // 슬라이드 블릿

  const indic = $(".indic li");

  // 2. 변수설정
  // (1) 애니시간
  const A_TM = 600;
  // (2) 애니이징
  const A_ES = "easeInOutQuint";
  // (3) 광클상태변수 (1-불허용, 0-허용)
  let cSts = 0;
  // (4) 슬라이드 순번
  let sNum = 0;
  // (5) 슬라이드 개수
  let sCnt = sldBox.find("li").length;
  // console.log('개수',sCnt);

  // 3. 이벤트 설정 및 기능구현
  // 이동버튼 클릭 시
  $(".abtn").click(function () {
    //true false 1과 0 참고
    //https://codedragon.tistory.com/4441
    // 0. 광클금지
    if (cSts) return;
    cSts = 1; // 잠금
    setTimeout(() => (cSts = 0), A_TM);

    // 1. 오른쪽 버튼 여부
    let isR = $(this).is(".rb");
    // console.log('버튼클릭',isR);

    // 2. 버튼별분기
    // 2-1. 오른쪽버튼
    if (isR) {
      // 슬라이드가 왼쪽으로 이동함
      // left값이 -100%
      sldBox.animate(
        { left: "-100%" },
        A_TM,
        A_ES,
        // animate ({},시간,이징,함수)
        () => {
          // 콜백함수(애니후)
          //맨앞 li맨뒤로 이동
          sldBox
            .append(sldBox.find("li").first())
            //동시에 left값은 0으로 초기화 함
            .css({ left: "0" });
        }
      );

      // 슬라이드 순번 증가(끝번호보다 크면 0)
      sNum++;
      if (sNum >= sCnt) sNum = 0;
    } ///// if //////
    // 2-2. 왼쪽버튼
    else {
      // 맨뒤 li 맨 앞으로 이동
      sldBox
        .prepend(sldBox.find("li").last())
        // left값 -100
        .css({ left: "-100%" })
        // left값을 0으로 애니메이션
        .animate({ left: "0" }, A_TM, A_ES);

      // 슬라이드 순번 감소(0보다 작으면 끝번호)
      sNum--;
      if (sNum < 0) sNum = sCnt - 1;
    } ///// else ///
    // console.log('슬라이드순번',sNum)

    // 블릿해당순번 클래스 'on'넣기 (다른 li는 제거)
    indic.eq(sNum).addClass("on").siblings().removeClass();
  }); /// click /////////
} ////// slideFn 함수 //////









// 배너컴포넌트 //
export function Banner(props) {
  //category - 카테고리 분류명(배너 데이터 선택)

  //선택 데이터
  const selData = banData[props.category];

  // 페이지 랜더링 후 실행구역
  useEffect(() => {
    console.log("랜더링후");
    // 슬라이드 기능 구현 함수 호출 : 선택데이터가 1 초과일 때
    if (selData.length > 1) slideFn();
  }); /////// useEffect ///////

  //리스트 만들기 함수
  const makeList = (data) => {
    console.log(data);

    return data.map((v, i) => (
      <li key={i}>
        <img src={v.src} alt="gg" />
        {/* 배너정보 */}
        <section class="bantit">
          <h3>{v.tit1}</h3>
          <h2>{v.tit2}</h2>
          <p>
            {v.cont}
          </p>
          <button>
            {v.btn}
          </button>
        </section>
      </li>
    ));
  };

  // 코드 리턴 /////////////
  return (
    <div className="banner">
      {/* 이동슬라이드 */}
      <ul className="slider">{makeList(selData)}</ul>

      {/* 이동버튼 + 슬라이드 블릿 : 슬라이드 2개 이상일 때 보임 */}

      {
        //조건식 && 코드 : 조건식이 ture일 때 코드출력
        selData.length > 1 && (
          <>
            {/* 양쪽이동버튼 */}
            <button className="abtn lb">＜</button>
            <button className="abtn rb">＞</button>
            {/* 블릿 인디케이터 - 선택데이터의 개수만큼 만들기 */}
            <ol className="indic">
              {selData.map((v, i) => (
                <li className={i == 0 ? "on" : ""} key={i}></li>
              ))}
            </ol>
          </>
        )
      }
    </div>
  );
} ///////// Banner 컴포넌트 //////////
