require('dotenv').config();

const express = require('express');
const supabase = require('./config/supabase');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensagem: 'Sistema de Gestão de Ocorrências e Ativos Escolares',
    status: 'Servidor funcionando!'
  });
});

app.get('/teste-supabase', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id')
      .limit(1);

    if (error) {
      return res.status(500).json({
        conectado: false,
        erro: error.message
      });
    }

    return res.json({
      conectado: true,
      mensagem: 'Consulta ao Supabase realizada com sucesso!',
      registrosEncontrados: data.length
    });
  } catch (error) {
    return res.status(500).json({
      conectado: false,
      erro: 'Falha ao consultar o Supabase.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});