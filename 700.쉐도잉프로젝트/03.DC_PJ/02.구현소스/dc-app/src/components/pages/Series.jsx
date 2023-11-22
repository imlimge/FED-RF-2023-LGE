// 시리즈 페이지 메인컨텐츠

import { Banner } from "../modules/Banner";
import { VidIntro } from "../modules/VidIntro";
import { VidSwipe } from "../modules/VidSwipe";

export function Series(){
    return(
        <>
        
            <Banner category="SERIES" />
            <VidIntro cat="MOVIES" cls="on" />
            <VidSwipe cat="movies" />
        </>
    )

} ////////////  Comics 컴포넌트 ///////////