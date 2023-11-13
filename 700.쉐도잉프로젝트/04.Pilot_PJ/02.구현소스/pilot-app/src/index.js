// 메인 페이지 JS - index.js\\
import React, { useState } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { TopArea } from './layout/TopArea';
import { MainArea } from './layout/MainArea';
import { FooterArea } from './layout/FooterArea';


// 페이지 공통 CSS
import './css/common.css';


// 최상위  Root 컴포넌트
function App(){

const [pgName,setPgName] = useState('main')

// ㅠㅔ이지 변경 상태변수 업데이트
const chgPgName = (txt) =>{
  setPgName(txt);
}



return(
  <>
    <TopArea />
    <button onClick={()=>chgPgName('main')}>메인페이지</button>
    <button onClick={()=>chgPgName('men')}>남성페이지</button>
    <button onClick={()=>chgPgName('women')}>여성페이지</button>
    <button onClick={()=>chgPgName('style')}>스타일페이지</button>
    <MainArea page={pgName}/>
    <FooterArea />
  </>
)
} /////////// App 컴포넌트 //////////////


// 출력하기 /////
const root = createRoot(document.querySelector('#root'));
root.render(<App />)
