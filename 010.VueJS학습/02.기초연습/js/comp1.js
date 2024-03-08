// 01.컴포넌트 연습1 JS

// 뷰 JS 인스턴스 생성용 함수 : x는 대상요소
const makeVue = x => new Vue({el:x});

// 1. 제목에 넣을 전역 컴포넌트
// Vue.component(캐밥케이스컴포넌트태그명,{옵션}) 이것으로 생성

Vue.component("tit-comp",{
  template:`
  <strong>
    <span>
      😐Vue JS컴포넌트 :
    </span>
    쇼핑몰 갤러리 리스트
  </strong>
  `
}); /// 전역 컴포넌트 ///


// 컴포넌트를 먼저 만들고나서 뷰인스턴스 생성함

// 뷰 인스턴스 생성하기
makeVue(".tit");

// 이미지번호 숫자증감 변수
let inum = 0;
// 상품명 배열
const goods = ["프레이컷", "아일렛기모", "베어부클", "포멀믹스톤"];


// 2. 갤러리 리스트에 넣을 전역 컴포넌트 만들기
Vue.component("list-comp",{
  // 2-1. template 옵션 : 태그구성
  // src 속성을 셋팅된 변수를 적용하기 위해
  // 속성앞에 v-bind:를 붙여서 v-bind:src
  // 로쓰면 값으로 문자형을 써도 그 안의 값은 변수가 된다
  template:`
  <div data-num="1">
    <img v-bind:src="gsrc" alt="의류아이템">
      <aside>
        <h2 v-text="gname"></h2>
        <h3 v-text="gprice"></h3>
      </aside>
  </div>
  `,
  // 2-2. data 옵션: 컴포넌트 내부 변수셋팅
  // 실행원리: 컴포넌트가 빌드할 때 data 속성의 함수를 호출
  // 그래서 리턴되는 객체값이 컴포넌트 내부에 전달된다
  data:function(){
    // 템플릿에서 사용할 변수는 반드시 리턴함
    // 속성:값으로 구성된 객체를 리턴한다
    return{
      // 이미지 src,
      gsrc : `images/${this.setNum()}.jpg`,
      // 상품명
      gname : this.setName(),
      // 상품가격
      gprice : this.setPrice(),
     }
  },
  // 2-3. methods속성 : 컴포넌트 내부 메서드 셋팅
  methods:{
    // inum을 1씩 증가하여 리턴함
    setNum(){
      inum+=1;
      // console.log('inum:',inum);
      return inum;
    },
    setName(){
      // 0~3 사이 난수
      let rdm = Math.floor(Math.random()*4);
      // 이름리턴
      return goods[rdm];
    },
    setPrice(){
      let rdm = Math.floor(Math.random()*17) + 3;
      return  this.addCommas(20000 * rdm) + "원";
    },
    addCommas(x) {
      return x.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
  }

}); // 전역컴포넌트 2 ///

// 리스트뷰 인스턴스 생성하기
makeVue('.grid');

// 유튜즈 아이프레임 컴포넌트 ///
Vue.component('ifr-comp',{
  template:`
  <iframe width="50%" style="aspect-ratio: 16/9;" v-bind:src="ifrsrc" title="#고윤정 과 함께 차가운 겨울을 더욱 액티브하게!  l 디스커버리 23FW #goyounjung #크롭패딩" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  `,
  // data:function(){
  data(){
    return{
      ifrsrc:`https://www.youtube.com/embed/ZH1Y1l1OmTY?autoplay=1&mute=1&loop=1&playlist=ZH1Y1l1OmTY`,
    };
  }, /// data ///
});

// 부모 컴포넌트 인스턴스 생성하기
makeVue('.you-box');