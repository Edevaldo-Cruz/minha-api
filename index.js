const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Rota principal
app.get("/", (req, res) => {
  res.json({ message: "API funcionando! �" });
});

// Rota de exemplo
app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "João" },
    { id: 2, name: "Maria" },
  ];
  res.json(users);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
