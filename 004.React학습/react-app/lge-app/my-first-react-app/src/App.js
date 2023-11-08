import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import $ from 'jquery';
window.jQuery = $;
require('jquery-ui-dist/jquery-ui');
require('jquery-ui-touch-punch/jquery.ui.touch-punch');


function App() {
  let isrc = './images/dcm36.jpeg';

  //렌더링 후 실행구역
  useEffect(()=>{
    $('.App-header').click(()=>{
      window.open('http://www.naver.com')
    })
    // 제이쿼리 드래그
    $('h1').draggable();

  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={isrc} style={{borderRadius:'50%'}} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         ㅠㅠㅠㅠㅠㅠㅠㅠㅠ
        </a>
        <h1>리액트리액트</h1>
      </header>
    </div>
  );
}

export default App;
