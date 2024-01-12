import './Form.css'
import { useState } from 'react'
function Form(){

    
    let [cep,setCEP] = useState()
    let [rua,setRua] = useState()
    let [numero,setNumero] = useState()
    let [bairro,setBairro] = useState()

    async function cadastrar(){
        
        let validacao = /^[0-9]{8}$/
        if(!validacao.test(cep)){
            throw "CEP inválido!!"
        }
        let resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        if(!resposta.ok){
            throw "Solicitação inválida!"
        }
        resposta = await resposta.json()

        let enderecos = []
        enderecos.push({
            "rua":resposta.logradouro,
            "cep":resposta.cep,
            "numero":numero,
            "bairro":resposta.bairro
        })

        console.log(enderecos)
        
    }
    function enviar(e){
        e.preventDefault()
        cadastrar()
    }

    return(
        <div className="main">
            <h1>Integração com API</h1>
            <form onSubmit={enviar}>
            <label>CEP:</label>
            <br></br>
            <input 
            type="text"             
            placeholder="Ex: 61000000" 
            onChange={(e) => setCEP(e.target.value)}
            value={cep}
            required>                
            </input>
            <br></br>
            <label>Rua:</label>
            <br></br>
            <input 
            type="text" 
            placeholder="Preenchimento automático!!"
            onChange={(e) => setRua(e.target.value)}
            value={rua}
            disabled></input>
            <br></br>
            <label>Numero:</label>
            <br></br>
            <input 
            type="text" 
            placeholder="Ex: 100"
            onChange={(e) => setNumero(e.target.value)}
            value={numero}
            required>                
            </input>
            <br></br>
            <label>Bairro:</label>
            <br></br>
            <input 
            type="text" 
            placeholder="Preenchimento automático!!"
            onChange={(e) => setBairro(e.target.value)}
            value={bairro}
            disabled>
            </input>
            <br></br>
            <button type='submit' id='button'>Cadastrar</button>
            </form>
        
        </div>
    )
}
export default Form
