// 난다 사이트 구성 JS

// 0. 상품정보 생성을 위한 생성자함수
class GetList {
  constructor(idx, name, img, price) {
    // idx - 일련번호, name - 상품명
    // img - 이미지이름, price - 상품가격
    this.idx = idx;
    this.name = name;
    this.img = img;
    this.price = price;


  }
} //// GetList 생성자 함수 /////



// 1. 뷰 JS 인스턴스 생성하기

const vm = new Vue({
  el: '#vue-app',
  // 대상은 아이디요소일 필요 없음
  // 클래스나 일반요소를 쓰면 첫번째 만나는 요소에 적용된다

  data:{
    // 2-1. 제목 데이터
    bigTit : 'Style NANDA',
    // 2-2. 로고 태그정보
    logo: `<img src="./images/logo_3ce.png" alt="nanda logo">`,
    // 2-3. 배너데이터
    content: `
      나는 날고 싶어
      <h2>오늘도 당신은 날고 싶다</h2>
      <img src="./images/sub_banner_e.jpg" alt="nanda banner">
    `,
    // 2-4. 상품정보 배열
    // 데이터를 클래스를 통해 생성하자
    itemData : [], // 배열 리터럴로 선언과 할당


    /* 
    ((예시데이터 셋팅))
    goodsData:[
      {
          idx:1,
          name:"vans와우",
          img:"vans_1.jpg"
      },
      {
          idx:2,
          name:"vans올레이",
          img:"vans_2.jpg"
      },
      {
          idx:3,
          name:"vans코코넛",
          img:"vans_3.jpg"
      },
      {
          idx:4,
          name:"vans마크로",
          img:"vans_4.jpg"
      },
]*/

  }, /// data ///

  methods:{
    // 이미지 태그를 만들어서 리턴함
    makeImg(val){ // val - 이미지 경로명
      return `
      <img src=""./images/${val}" alt="item">
      `;
    },
    //정규식함수(숫자 세자리마다 콤마해주는 기능)
    numberWithCommas(x) {
      return x.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
  }, /// methods ///
  // [뷰인스턴스 초기화 완료단계 : created]
  // 이미 뷰인스턴스는 생성된 후 데이터를 셋업하기
  // 적격인 단계가 바로 created 단계임
  // created:function(){코드}
  created: function(){

    // 상품데이터 클래스를 호출하여 객체를 생성하자
    
    // 1. 상품명 배열
    const goods = ["프레이컷","아일렛기모","베어부클","포멀믹스톤"];

    // 2. 상품 정보 객체 클래스를 호출하자
    for(let i=1; i<19; i++){
      // 2-1. 정해진 상품명 시작부분 랜덤하게 넣기
      // 위의 배열 4가지 중 한가지 랜덤
      let rdm1 = Math.floor(Math.random()*4);

      // 2-2. 다양한 가격을 위해 4~20사이 난수곱
      let rdm2 = Math.ceil(Math.random()*17)+3
      console.log('랜덤1:',rdm1,'/랜덤2:',rdm2);

      // 2-3. 뷰인스턴스의 itemData 배열값 넣기
      // this키워드로 접근한다. this.itemData
      this.itemData.push(
        new GetList(
          i, // 일련번호
          goods[rdm1], // 상품명
          `fashion1/${i}.jpg`,

          )
        )

    }


  }, /// created ////



}); // Vue 인스턴스 설정 /////

