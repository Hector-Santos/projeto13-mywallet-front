import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components';
import {Link} from 'react-router-dom'
import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate, } from "react-router-dom";
import TokenContext from './contexts/TokenContext';
import { ThreeDots } from 'react-loader-spinner';

export default function Login(){
    const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
    const [disabled, setDisabled] = useState(false)
    const {token, setToken} = useContext(TokenContext)
    const [botao, setBotao] = useState("Entrar")
    const [colorButton, setColorButton] = useState("#A328D6");
    const [colorInput, setColorInput] = useState("black");
    const navigate = useNavigate();
    
   
    function fazerLogin(event) {
        event.preventDefault()
        setDisabled(true)
        setColorButton("#9a78ba")
        setColorInput("#AFAFAF")
        setBotao(<ThreeDots color="white" height={80} width={80} />)
        let body = {
            email:email,
            password:senha
        }
        let promise = axios.post("http://localhost:5000/sign-in", body)
        promise.then((response => {
            console.log(response)
            setToken(response.data)
            
            
          }))
          promise.catch((response => {
          alert(`Falha no login.Verifique seu usario e senha ${response}`)
          setColorButton("#A328D6")
          setColorInput("black")
          setDisabled(false)
          setBotao("Login")
          }
          ))
        
    }
    
    
    return (
        
        <Container disabled={disabled} colorInput= {colorInput} colorButton={colorButton}>
        <GlobalStyle/>
        <h1>MyWallet</h1>
        <Form >
        <form onSubmit={fazerLogin}>
            <input  disabled ={disabled} placeholder = "Email" type= "email" value={email} onChange={e => setEmail(e.target.value)} />
            <input disabled ={disabled} placeholder = "Senha" type="password"value={senha} onChange={e => setSenha(e.target.value)}/>
            <button disabled = {disabled} type="submit">{botao}</button>
        </form>
        </Form>
        <Link to = "/cadastro">
        <h2>Primeira vez? Cadastre-se! </h2>
        </Link>
        </Container>
        
    )
}

export const GlobalStyle = createGlobalStyle`
body{
    background-color: #9567BE;
}

`
export const Container = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-family: 'Raleway', sans-serif;
font-size: 20px;
height: 100vh;
width: 100vw;
padding-bottom: 100px;
img{
    height: auto;
    width: 200px;
}
input{
height: 45px;
border-radius: 5px;
margin-bottom: 10px;
width: 80vw;
color : ${props => props.colorInput };
border: 1px solid #D4D4D4;
font-size: 20px;
background-color: #ffffff;
::placeholder{
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    color: black;
}
}
button{
display: flex;
align-items: center;
justify-content: center;
height: 45px;
width: 81vw;
border-radius: 5px;
color: white;
font-weight: bold;
background-color: ${props => props.colorButton} ;
border: none;
font-family: 'Raleway', sans-serif;
font-size: 20px;
}

h1{
    font-family: 'Saira Stencil One', cursive;
    font-size: 40px;
    color: #ffffff;
    margin-bottom: 30px;
}
h2{
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    color: #ffffff;
    margin-top: 30px;
    text-decoration: underline;
}
` 
export const Form = styled.div`
margin-left: 8vw;
`