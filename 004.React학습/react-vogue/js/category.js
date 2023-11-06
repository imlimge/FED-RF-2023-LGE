// 보그 PJ 카테고리 페이지 JS - category.js


// 카테고리 데이터 가져오기 /////
import catData from "./data/category_data.js";

// console.log(catData);


// 상단영역 컴포넌트 불러오기 ///
import TopArea from "./components/top_area.jsx";

// 하단영역 컴포넌트 불러오기 ///
import FooterArea from "./components/footer_area.jsx";



// 상단영역 출력하기 /////////////////
ReactDOM.render(<TopArea />, document.querySelector(".top-area"));
/////////////////////////////////////


// 하단영역 출력하기 /////////////////

ReactDOM.render(<FooterArea />, document.querySelector(".footer-area"));
/////////////////////////////////////


//////////////////////////////////////////////////////

////// 카테고리 페이지 메인 컴포넌트 ///////
/******************************************* 
  컴포넌트명 : MainCategory
  기능 : 아이템 페이지 타이틀 + 리스트 요소구성
*******************************************/
function MainCategory() {
  // 우선 URL로 넘어온 키값을 가져옴!
  // 파라미터 전달값 받기 : 파라미터JS전담객체는?
  // -> URLSearchParams(전체URL)
  const params = new URLSearchParams(location.search);

  // 파라미터중 특정키 받기 : get(키이름) -> 키이름은 'cat'
  const catName = decodeURIComponent(params.get("cat"));
  // 'time & gem' decodeURIComponent로 변환!
  // 보내는 곳에서는 encodeURIComponent로 처리해야 함

  console.log(
    "URL",
    location.search,
    "\n파라미터:",
    params,
    "\n키값:",
    catName
  );

  // 카테고리 데이터 상태관리 변수 만들기
  const [nowCat, setNowCat] = React.useState(catName);

  // 카테고리 해당 데이터 선택하기
  // 카테고리 전체 객체 데이터 중 해당항목 선택
  const selData = catData[nowCat];

  console.log(selData);
  const chgMenu = () => setNowCat("living");

  return (
    <React.Fragment>
      <SubTitle tit={selData["제목"]} menu={selData["메뉴"]} />
      <button onClick={chgMenu}>변경</button>

      <ItemList cname={selData["경로"]} tit={selData["타이틀"]} />
    </React.Fragment>
  );
} ///////// MainCategory 컴포넌트 /////////////




// 메인영역 출력하기 ////////////////////
ReactDOM.render(<MainCategory />, document.querySelector(".main-area"));
///////////////////////////////////////








////// 메인 컴포넌트 하위 서브타이틀 컴포넌트 /////
/******************************************* 
  컴포넌트명 : SubTitle
  기능 : 서브 타이틀 요소구성
*******************************************/
function SubTitle(props) {
  // tit - 서브타이틀

  // 서브메뉴 있을 경우 li데이터 생성하기
  // 전달변수 data에 들어오는 값은 메뉴 배열임
  // 배열.map(v=>코드) -> html생성 후 리턴됨
  const makeList = (data) =>
    data.map((v) => (
      <li>
        <a href="#">{v}</a>
      </li>
    )); ///////////// makeList 함수 ///////////////

  // 오리지널 JS map()문법은 배열을 다시 리턴함
  // JS에서는 배열.mpa().join('')로 사용했음
  // -> 리액트에서는 리액트용 map()을 다시 구성하여 바로 html코드를 리턴함
  // -> join() 불필요

  return (
    // 2-1. 카테고리 페이지 상단영역
    <header className="cat-top-area">
      {/* 2-1-1. 서브타이틀 */}
      <h2 className="cat-tit">{props.tit}</h2>
      {/* 2-1-2. 서브메뉴(LNB:Local Navigation Bar) */}
      {props.menu != "없음" && (
        <nav className="lnb">
          <ul>{makeList(props.menu)}</ul>
        </nav>
      )}
    </header>
  );
} /////////////// SubTitle 컴포넌트 //////////////

////// 메인 컴포넌트 하위 리스트 컴포넌트 /////
/******************************************* 
  컴포넌트명 : ItemList
  기능 : 카테고리 아이템별 리스트요소구성
*******************************************/
function ItemList(props) {
  // cname - 카테고리명 (클래스명 넣기)
  // tit - 리스트 타이틀

  //태그처리 구분 코드생성 함수
  const makeCode = (data) => {
    // console.log('배열인가',Array.isArray(data));

    if (Array.isArray(data)) {
      //배열인경우
      return (
        <h2>
          <small>{data[0]}</small>
          <br />
          {data[1]}
        </h2>
      );
    } ///if ////
    else {
      // 배열이 아닌경우
      return <h2>{data}</h2>;
    } ///// else ////
  }; /////////// makeCode 함수 ////////

  return (
    // 2-2. 카테고리 페이지 컨텐츠영역
    // html출력일경우 dangerouslySetInnerHTML을 사용함
    // <요소 dangerouslySetInnerHTML ={{__html:값}}>
    // 데이터 값에 <small>내용</small> 로 태그가 사용되어 있을때 보안의 문제때문에
    // <h2 dangerouslySetInnerHTML = {{__html:props.tit[0]}}></h2> 이렇게 사용 할 수 있따

    <div className={"cat-cont-area " + props.cname}>
      <section className="pt2">
        <div className="cbx bgi bg1-1">{makeCode(props.tit[0])}</div>

        {/* 이건 이전에 makeCode만들기 전에 설정해둔것  */}
        <div className="cbx bgi bg1-2">
          {/* 배열데이터면 small태그 처리 */}
          {Array.isArray(props.tit[1]) && (
            <h2>
              <small>{props.tit[1][0]}</small>
              <br />
              {props.tit[1][1]}
            </h2>
          )}

          {/* 배열데이터 아니면 일반처리 */}
          {!Array.isArray(props.tit[1]) && <h2>{props.tit[1]}</h2>}
        </div>
        <div className="cbx bgi bg1-3">{makeCode(props.tit[2])}</div>
      </section>
      <section className="pt2">
        <div className="cbx bgi bg2-1">{makeCode(props.tit[3])}</div>
        <div className="cbx bgi bg2-2">{makeCode(props.tit[4])}</div>
        <div className="cbx bgi bg2-3">{makeCode(props.tit[5])}</div>
      </section>
    </div>
  );
} /////////////// ItemList 컴포넌트 //////////////
