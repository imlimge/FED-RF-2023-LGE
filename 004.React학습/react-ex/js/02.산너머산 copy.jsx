
import { mtInfo } from "./02.sub_com/mountain";

console.log(mtInfo)


/******************************************** 
1. props로 데이터를 전달하여 제목출력하기
-> props Down으로 데이터를 하위 컴포넌트에 전달
********************************************/

function MyHome(){

    return<MyRomm aa="세계의 산" bb="산산" />;


}


function MyRoom(){
    
    return<MyBag cc={} dd={} />

}

function MyBag(){

    return<></>
}