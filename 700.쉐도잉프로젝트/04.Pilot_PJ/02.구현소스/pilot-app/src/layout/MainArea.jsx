// Pilot PJ 메인영역 공통 컴포넌트

import { MainCont } from "../pages/MainCont";
import { Fashion } from "../pages/Fashion";


// 라우터 역할을 하는 MainArea 컴포넌트 ////////
export function MainArea(props){
    // props.page 속성값으로 main/men/women/style
    return(
        <>
            {
            //main이 아니면 서브 Fashion으로 이동
            props.page=='main'?<MainCont />:
            <Fashion cat={props.page} />
            }
        </>
    );
} //////////////// MainArea 컴포넌트 //////////