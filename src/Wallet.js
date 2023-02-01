import styled from 'styled-components'
import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { useNavigate, } from "react-router-dom";
import TokenContext from './contexts/TokenContext';
import { Container, GlobalStyle } from './Login';


export default function Wallet() {
  const [name, setName] = useState("");
  const { token } = useContext(TokenContext)
  const [logs, setLogs]= useState("");
  const [soma, setSoma] = useState(0)
  const navigate = useNavigate();
  const REACT_APP_REQUEST_URL = process.env.REACT_APP_REQUEST_URL

  function getSoma(logs){
      let aux = 0
      for(let i=0; i< logs.length; i++){
      logs[i].tipo === "entrada"? aux+= parseInt(logs[i].valor):aux-= parseInt(logs[i].valor) 
      }
      setSoma(aux)
    }
 function refreshLogin(){
  navigate("/")
  document.location.reload()
 }
  useEffect(() => {
  
    let promise = axios.get(`${REACT_APP_REQUEST_URL}/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    promise.then((response => {
      setName(response.data.name)
    }))
    promise.catch((response => {
    console.log(response)
    }
    ))
    let promise1 = axios.get(`${REACT_APP_REQUEST_URL}/logs`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    promise1.then((response => {
      setLogs(response.data)
      getSoma(response.data)
    }))
    
    promise1.catch((response => {
      console.log(response)
    }
    ))
  },[]);
  
  return (

    <Container >

      <Title><h3>{`Olá, ${name}`}</h3>
        <ion-icon onClick={() => refreshLogin()} name="exit-outline"></ion-icon>
      </Title>

      <Logs>
       {logs.length? logs.map(({valor,descricao,tipo,data }) =>
       { return(
        <React.Fragment>
       <Linha>
       <ColunaUm><h1>{`${data}  `}</h1> <div></div> <h2>{`${descricao}`}</h2></ColunaUm>
       <ColunaDois>
       {tipo === "entrada"? <h1>{`${valor}`}</h1>:<h2>{`${valor}`}</h2> }
       </ColunaDois>
       </Linha> 
       <Soma>
       <ColunaUm><h3>SALDO</h3> </ColunaUm>
        <ColunaDois>
         {soma >= 0? <h1>{`${soma}`}</h1>:<h2>{`${soma}`}</h2> }
        </ColunaDois>
       </Soma>
       </React.Fragment>
       )}) : <Menssagem><h1>Não há registros de entrada ou saída</h1></Menssagem>}
       
      </Logs>
      <Buttons>
        <button onClick={() => navigate("/entrada")}>
          <ion-icon name="add-circle-outline"></ion-icon>
          <div>Nova Entrada</div>
        </button>
        <button onClick={() => navigate("/saida")}>
          <ion-icon name="remove-circle-outline"></ion-icon>
          <div>Nova Saída</div>
        </button>
      </Buttons>
      <GlobalStyle />
    </Container>

  )

}
export const Title = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-start;
height: 40px;
width: 88vw;
top:10px;
left:22px;
right: 22px;
font-size: 35px;
margin-top: 10px;
margin-bottom: 10px;
color:white;
`
const Logs = styled.div`
height: 75vh;
width: 88vw;
box-sizing: border-box;
border-radius: 5px;
margin-right: 4vw;
background-color: white;
padding-left: 10px;
padding-right: 10px;
position: relative;
`
const Buttons = styled.div`
display: flex;
justify-content: space-between;
margin-top: 10px;
width: 88vw;
margin-right: 4vw;
button{
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
height: 114px;
width: 155px;
padding-right: 100px;
background-color: #AC74D5;
border-radius: 5px;
font-size: 30px;
    div{
    bottom:10px;
    left: 10px;
    color: white;
    font-size: 15px;
    font-family: 'Raleway', sans-serif;
    text-align: left;
    }
}
`
const ColunaUm = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
h1{
  display: inline;
  color:gray;
  font-weight: 300;
  font-size: 15px;
  text-align: center;
  font-family:'Raleway', sans-serif;
  margin-top: 0px;
  margin-bottom: 0px;
}
h2{
  display: inline;
  text-decoration:none;
  color:black;
  font-weight: 500;
  font-size: 15px;
  text-align: center;
  font-family:'Raleway', sans-serif;
  margin-top: 0px;
  margin-bottom: 0px;
}
h3{
  display: inline;
  text-decoration:none;
  color:black;
  font-weight: 700;
  font-size: 15px;
  text-align: center;
  font-family:'Raleway', sans-serif;
  margin-top: 0px;
  margin-bottom: 0px;
}
div{
  display: inline-block;
  width: 10px;
}
`
const ColunaDois = styled.div`
margin-top: 5px;
h1{
  color:green;
  font-weight: 500;
  font-size: 15px;
  text-align: center;
  font-family:'Raleway', sans-serif;
  margin-top: 0px;
}
h2{
  color:red;
  font-weight: 500;
  font-size: 15px;
  text-align: center;
  font-family:'Raleway', sans-serif;
  margin-top: 0px;
  text-decoration: none;
}
`
const Linha = styled.div`
display: flex;
height: 35px;
justify-content: space-between;
`
const Menssagem = styled.div`
display: flex;
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
h1{
  margin-left: 70px;
  margin-right: 70px;
  color:black;
  font-weight: 300;
  font-size: 20px;
  text-align: center;
  font-family:'Raleway', sans-serif;
}
`
const Soma = styled.div`
display: flex;
height: 35px;
width: 83vw;
justify-content: space-between;
position: absolute;
bottom:20px;
left: 10px
`