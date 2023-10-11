// 보그 PJ - 공통 모듈 JS : common.js

// DOM메서드
import dFn from './dom.js';

// 상단, 하단, 공통 데이터 불러오기
import tData from './data/com_module.js';

console.log(dFn,tData);


// 부드러운 스크롤 모듈
// import { startSS, setPos } from "./smoothScroll23.js";

// [1]부드러운 스크롤 적용 //////////
// startSS();


// [2]상단 하단 공통모듈넣기

// 대상 선정: .common-area
const comArea = dFn.qsa('.common-area');

// 상단 영역
comArea[0].innerHTML = tData.topArea;
// 하단 영역 html넣기 
comArea[1].innerHTML = tData.footerArea;

