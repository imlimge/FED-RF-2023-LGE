// MainArea 컴포넌트

import { Banner } from "../contents/Banner";
import { Main } from "../contents/Main";
import { Character } from "../contents/Character";

export function MainArea(props){
  //cat속성으로 메뉴 분류 전달

  return(
      <main className="cont">
        <Main cat={props.cat}/>
      </main>
  );

} ///////// MainArea 컴포넌트 ////////////