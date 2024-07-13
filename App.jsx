import { useState } from 'react'
import axios from 'axios'

function getAnosApartir1950() {
  const anoLimite = 1950;
  let anoReferencia = new Date().getFullYear();

  const anos = [];

  do {
    anos.push(anoReferencia);
    anoReferencia--;
  } while (anoReferencia >= anoLimite)
  return anos;
}


function App() {

  const [pais, setPais] = useState('');
  const [anoNascimento, setAnoNascimento] = useState('');

  const getPaises = () => {
    return [
      {
        descricao: 'Brasil',
        id: 'BR',
      },
      {
        descricao: 'Japão',
        id: 'JP',
      },
      {
        descricao: 'Estados Unidos',
        id: 'EUA',
      }
    ]
  }

  function handleOnClick() {
   
    const url = 'http://localhost:3002/pode-comprar';

    axios({
      method: 'get',
      url: url,
      data: {
        pais: setPais,
        anoNascimento: setAnoNascimento
      }
    })
    }


  return (
    <>
      <div class = "alls">
      <h1>Pode Comprar?</h1>
      <div class = "pais"> 
      <label for = "pais"> País: </label>
      <br/>
      
      <select name="pais" id="pais" onChange={(event) => {
        setPais(event.target.value)
      }}>
       
        <option  value="" disabled selected>Selecione</option>
        {
          getPaises().map(pais => (
            <option  value={pais.id}>{pais.descricao}</option>
          ))
        }
       
      </select>
      </div>
      <br />
      <div class = "ano">
      <label for="ano">Ano Nascimento:</label>
      <br />
      <select name="ano" id="ano" onChange={(event) => {
        setAnoNascimento(event.target.value)
      }}>
        <option value="" disabled selected>Selecione</option>
        {
          getAnosApartir1950().map(ano => (
            <option value={ano}>{ano}</option>
          ))
        }
      </select>
      </div>
      <br />
      <nav class = "consulta">
      <button disabled={pais === '' || anoNascimento === ''} onClick={handleOnClick}>Consultar</button>
      </nav> 
      </div>
    </>
  )
}

export default App
