// 비디오페이지 메인컨텐츠

import { isrc } from "../data/imgSrc";


export function Video(){
    return(
        <>
           
            <iframe src={isrc.video} />
        </>
    )

} ////////////  Video 컴포넌트 ///////////