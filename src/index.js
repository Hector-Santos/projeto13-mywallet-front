import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import ReactDOM  from 'react-dom'
import {useState} from "react"
import Cadastro from "./Cadastro"
import Wallet from "./Wallet.js"
import Entrada from "./Entrada"
import Saida from "./Saida"
import Login from "./Login"
import TokenContext from './contexts/TokenContext'

export default function App(){
   const [token, setToken] = useState("");
   
      
  
   return(
    <TokenContext.Provider value={{token, setToken}}>
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Login />}/>
     <Route path="/cadastro" element={<Cadastro />}/>
     <Route path="/wallet" element={<Wallet />}/>
     <Route path="/entrada" element={<Entrada />}/>
     <Route path="/saida" element={<Saida />}/>
    </Routes>
    </BrowserRouter>
    </TokenContext.Provider>
     
     )
     
}
ReactDOM.render(<App/>, document.querySelector(".root"));