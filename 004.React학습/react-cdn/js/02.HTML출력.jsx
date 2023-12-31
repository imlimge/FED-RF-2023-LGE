//02.HTML출력.jsx

// 변수에 태그를 jsx문법으로 작성하여 할당한다
// 주의사항) JSX는 최상위부모가 단 하나여아한다 (기본 XML문법과 동일)

// 배열 데이터 생성하기
const data = [
  {이름:"김소영",전화번호:"010-222-3333",생일:"20.01.20"},
  {이름:"전우치",전화번호:"010-555-8888",생일:"18.05.20"},
  {이름:"강감찬",전화번호:"010-666-5555",생일:"21.02.03"},
  {이름:"공유",전화번호:"010-999-5555",생일:"79.08.20"},
  {이름:"김마리",전화번호:"010-888-4578",생일:"00.01.02"},
];

// 위의 데이터를 사용하여 tr>td로 되어 있는 반복리스트 코드만들기
// 다시 재구성한 배열을 만드는 map을 사용해보자
const listCode = data.map(val=>
  <tr>
    <td>{val.이름}</td>
    <td>{val.전화번호}</td>
    <td>{val.생일}</td>
  </tr>
  ); /// map으로 데이터를 변경하여 다시 새로운 배열을 생성

  console.log(listCode);

// 전체 테이블 코드 //////
// html 태그 내부에 변수 등 JS 문법을 사용할 때는 중괄호{}를 사용한다
const tableCode = (
  <div>
    <h1>나의 친구 리스트</h1>
    <table>
      <tr>
        <th>이름</th>
        <th>전화번호</th>
        <th>생일</th>
      </tr>

      {listCode}


      {
      
      /* 여러줄 주석
      주석도 중괄호 안에 씀
      */

      // 한줄 주석
      // 반복리스트가 이자리에 사용됨
      
       }


    </table>

  </div>
); //////tableCode변수//////////


//화면출력/////////////
//ReactDOM.render(출력할요소,대상요소)
ReactDOM.render(tableCode,document.querySelector('#root'));

