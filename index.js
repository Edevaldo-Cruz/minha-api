const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MongoDB Atlas (substitua pela sua URL)
mongoose.connect('mongodb+srv://api-user:senha123@banco1.h5bxdig.mongodb.net/?retryWrites=true&w=majority&appName=banco1')
  .then(() => console.log('Conectado ao MongoDB Atlas!'))
  .catch(err => console.error('Erro na conexão:', err));

// ROTAS CRUD
// Criar usuário (POST)
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Listar todos (GET)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Buscar por ID (GET)
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('Usuário não encontrado');
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Atualizar (PUT)
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send('Usuário não encontrado');
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Deletar (DELETE)
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('Usuário não encontrado');
    res.send({ message: 'Usuário deletado!' });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('API CRUD com MongoDB Atlas!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});