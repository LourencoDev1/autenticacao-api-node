require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/routes/auth.routes');

const app = express();
app.use(express.json());


app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});