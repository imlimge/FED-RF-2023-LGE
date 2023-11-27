// 신상품 컴포넌트 ////////

export function SinSang(props) {


  const makeList = ()=>{

    let temp =[];
    for(let x=0; x<9; x++){
      temp[x] = 
      
      <li className={"m"+(x+1)} key={x}>
      <a href="#">
        <img src={"./images/goods/"+props.cat+"/m"+(x+1)+".png"} 
        alt="신상품"/>
      </a>
    </li> 

    } ///for
    return temp;


  }



  return (
    <>
      <h1>신상품 {props.cat} </h1>

      <h2 className="c1tit js-reveal">
        NEW MEN'S ARRIVAL
        <button>전체리스트</button>
      </h2>
      <div className="flowbx">
        <ul className="flist">
            { makeList()}
        </ul>
      </div>
    </>
  );
} //// SinSang 컴포넌트 ////////
