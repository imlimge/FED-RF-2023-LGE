// 캐릭터 리스트 컴포넌트

// 캐릭터 리스트 모듈 CSS 불러오기
import '../../css/cat_list.css'
import { SwiperCat } from '../plugin/SwiperCat'


export function CatList(){

  return(
    <>  
    <section className="cat-swbox">
    {/* 1. 모듈타이틀 */}
    <h2 className="tit">
    WHO'S WHO: THE JUSTICE LEAGUE
    </h2>
    {/* 스와이퍼 컴포넌트 */}
    <SwiperCat />
    </section>
    </>
  )
} ///////// CatList 컴포넌트 ///////////////