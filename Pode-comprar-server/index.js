import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/pode-comprar", (req, res) => {
    const { anoNascimento, pais } = req.query;  // Alterado de req.body para req.query

    if (!anoNascimento || !pais) {
        return res.status(400).json({ error: "Ano de nascimento e país são obrigatórios" });
    }

    let idadeMinima = 0;

    switch (pais) {
        case 'BR':
            idadeMinima = 18;
            break;
        case 'JP':
            idadeMinima = 19;
            break;
        case 'EUA':
            idadeMinima = 21;
            break;
        default:
            return res.status(400).json({ error: "País não suportado" });
    }

    const idade = new Date().getFullYear() - Number(anoNascimento); 

    const podeComprar = idade >= idadeMinima;

    setTimeout(() => {
        res.json({ podeComprar });
    }, 1000);
});

app.listen(3002, () => console.log('Rodando em http://localhost:3002'));
