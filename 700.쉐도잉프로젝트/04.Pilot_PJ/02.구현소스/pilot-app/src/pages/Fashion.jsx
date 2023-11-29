// 공통패션 서브 페이지 컨텐츠 컴포넌트

import { useContext, useEffect } from "react"

// 컨텍스트 API 불러오기
import { pCon } from '../modules/PilotContext';


// 제이쿼리 호출
import $ from "jquery";


//공통 서브 CSS불러오기
import "../css/fashion.css"
import { SwiperApp } from "../plugin/SwiperApp";
import { SinSang } from "../modules/SinSang";
import { ItemDetail } from "../modules/ItemDetail";




export function Fashion(props){
  // 컨텍스트 API 사용
  const myCon = useContext(pCon);

  useEffect(()=>{
    $('html,body').css({overflow:'visible'});
    
    //로고클릭 시 페이지 이동 : pgName 변경 - > chgPgName()
    $('#logo a').click(()=>myCon.chgPgName('main'));

    // document.querySelector('html').style.overflow='visible';
    // document.querySelector('body').style.overflow='visible';
  },[])

  return(
    <>
      {/* 1. 배너영역 */}
      <section id="ban" className="page">
        <SwiperApp cat={myCon.pgName} />
      </section>
      {/* 2. 신상품영역 */}
      <section id="c1" className={"cont c1 "+ myCon.pgName}>
        <SinSang cat={props.cat} />
      </section>

      {/* 2.5. 상세보기박스 */}
      <div className="bgbx">
      <ItemDetail />
      </div>
      {/* 3. 패럴랙스 */}
      <section id="c2" className={"cont c2 "+ myCon.pgName}></section>
      {/* 4. 단일상품영역 */}
      <section id="c3" className="cont c3"></section>
      {/* 5. 스타일상품영역 */}
      <section id="c4" className="cont c4"></section>
    </> 

  )


} ///// MenSub 컴포넌트 //// 




      {/* 
      section#c$.cont.c$*4 
      <section id="c1" className="cont c1"></section>
      <section id="c2" className="cont c2"></section>
      <section id="c3" className="cont c3"></section>
      <section id="c4" className="cont c4"></section>
    */}