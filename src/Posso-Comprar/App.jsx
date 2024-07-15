import React, { useState } from 'react';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader"; // npm install --save react-spinners
import Swal from 'sweetalert2'; //npm install sweetalert2


function alertMens(mens, icons) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top"
  });

  Toast.fire({
    title: 'RESULTADO',
    text: mens,
    icon: icons,
    confirmButtonText: 'OK',
    customClass: {
      title: 'swalTitle',
      confirmButton: 'swalButton'
    }
  });   
  
}

function getAnosApartir1950() {
  const anoLimite = 1950;
  let anoReferencia = new Date().getFullYear();
  const anos = [];

  do {
    anos.push(anoReferencia);
    anoReferencia--;
  } while (anoReferencia >= anoLimite);

  return anos;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [pais, setPais] = useState('');
  const [anoNascimento, setAnoNascimento] = useState('');

  const getPaises = () => {
    return [
      { descricao: 'Brasil', id: 'BR' },
      { descricao: 'Japão', id: 'JP' },
      { descricao: 'Estados Unidos', id: 'EUA' }
    ];
  }

  const handleOnClick = () => {
    setLoading(true); 

    const url = 'http://localhost:3002/pode-comprar';

    axios.get(url, {
      params: {
        anoNascimento: anoNascimento,
        pais: pais
      }
    })
      .then(response => {
        setLoading(false); 
        const { podeComprar } = response.data;
        if (podeComprar) {
          alertMens("Você pode comprar.", 'success');
        } else {
          alertMens("Você não pode comprar.", 'error');
        }
      })
      .catch(error => {
        console.error('Houve um erro na requisição!', error);
        setResultadoConsulta("Erro ao consultar.");
      })
     
  }

  return (
    <>
      <div className="container">
        <div className="alls">
          <h1>Pode Comprar?</h1>
          <div className="pais">
            <label htmlFor="pais">País:</label>
            <br />
            <select
              name="pais"
              id="pais"
              onChange={(event) => setPais(event.target.value)}
              value={pais}
            >
              <option value="" disabled>Selecione</option>
              {getPaises().map(pais => (
                <option key={pais.id} value={pais.id}>{pais.descricao}</option>
              ))}
            </select>
          </div>
          <br />
          <div className="ano">
            <label htmlFor="ano">Ano de Nascimento:</label>
            <br />
            <select
              name="ano"
              id="ano"
              onChange={(event) => setAnoNascimento(event.target.value)}
              value={anoNascimento}
            >
              <option value="" disabled>Selecione</option>
              {getAnosApartir1950().map(ano => (
                <option key={ano} value={ano}>{ano}</option>
              ))}
            </select>
          </div>
          <br />
          <nav className="consulta">
            <button
              disabled={loading || pais === '' || anoNascimento === ''}
              onClick={handleOnClick}
            >
              {loading ? (
                <ClipLoader color={'#bb0202'} loading={loading} size={15} />
              ) : (
                'Consultar'
              )}
            </button>
          </nav>
        </div>
      </div>
    </>
  );
  
}

export default App;
