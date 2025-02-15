const express = require("express");
const app = express();

// Importar as rotas
const pingRoute = require("./routes/ping");
const statusRoute = require("./routes/status");

const PORT = 3000;

// Usar as rotas
app.use("/ping", pingRoute);
app.use("/status", statusRoute);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
