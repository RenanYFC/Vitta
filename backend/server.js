import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve as imagens dos produtos como arquivos estáticos
app.use('/imagens-produtos', express.static(path.join(__dirname, 'imagens-produtos')));

// Endpoint para retornar todos os produtos
app.get('/api/products', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'products.json'), 'utf8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    console.error('Erro ao ler products.json:', error);
    res.status(500).json({ error: 'Erro ao obter produtos do banco simulado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Backend Mock rodando em http://localhost:${PORT}`);
});
