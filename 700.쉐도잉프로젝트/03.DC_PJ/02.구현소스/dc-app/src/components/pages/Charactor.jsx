// 캐릭터페이지 메인컨텐츠

import { Banner } from "../modules/Banner";
import { CatList } from "../modules/CatList";

export function Character(){
    return(
        <>
            {/* 배너 */}
            <Banner category="CHARACTERS" />

            {/* 캐릭터리스트 */}
            <CatList />

        </>
    )

} ////////////  Character 컴포넌트 ///////////