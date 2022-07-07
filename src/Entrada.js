import styled from 'styled-components'
import { useState, useContext, } from "react";
import axios from 'axios';
import { useNavigate, } from "react-router-dom";
import TokenContext from './contexts/TokenContext';
import { Container, GlobalStyle, Form } from './Login';
import { Title } from './Wallet';
import { ThreeDots } from 'react-loader-spinner';
import dayjs from 'dayjs';


export default function Entrada(){
    const [disabled, setDisabled] = useState(false)
    const {token, setToken} = useContext(TokenContext)
    const [botao, setBotao] = useState("Salvar Entrada")
    const [valor, setValor] = useState("")
    const [descricao, setDescricao] = useState("")
    const [colorButton, setColorButton] = useState("#A328D6");
    const [colorInput, setColorInput] = useState("black");
    const navigate = useNavigate();


    function submeterEntrada(event) {
        event.preventDefault()
        setDisabled(true)
        setColorButton("#9a78ba")
        setColorInput("#AFAFAF")
        setBotao(<ThreeDots color="white" height={80} width={80} />)
        let hoje = dayjs().format('DD/MM')
        let body = {
            valor:valor,
            descricao:descricao,
            tipo:"entrada",
            data: hoje
        }
        let promise = axios.post("https://mywallet010.herokuapp.com/entrada", body,{
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          })
        promise.then(()=> {
            navigate("/wallet")
          })
          promise.catch((response => {
          alert(`Erro na submissão ${response}`)
          setColorButton("#A328D6")
          setColorInput("black")
          setDisabled(false)
          setBotao("Salvar Entrada")
          }
          ))
    }
    return (
       
        <Container disabled={disabled} colorInput= {colorInput} colorButton={colorButton}>
        
        <Title><h3>Nova Entrada</h3></Title>
        <Form>
        <form onSubmit={submeterEntrada}>
        <input disabled ={disabled} placeholder = "Valor" value={valor} onChange={e => setValor(e.target.value)} />
        <input disabled ={disabled} placeholder = "Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
        <button disabled = {disabled} type="submit">{botao}</button>
        </form>
        </Form>
        <Blank></Blank>
        <GlobalStyle/>
        </Container>
        
    )
}

const Blank = styled.div`
height: 60vh;
`