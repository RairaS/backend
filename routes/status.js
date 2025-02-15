const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        status: "Servidor rodando",
        date: new Date().toISOString(),
        uptime: process.uptime() // Tempo que o servidor está ativo
    });
});

module.exports = router;
