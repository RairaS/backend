const express = require("express");
const app = express();

app.use(express.json()); // Permite receber JSON no corpo das requisições

// Simulação de um banco de dados em memória
let products = [
    { id: 1, name: "Laptop", price: 2500 },
    { id: 2, name: "Mouse", price: 150 }
];

// Rota GET para listar produtos
app.get("/products", (req, res) => {
    res.json(products);
});

// Rota GET para buscar um produto por ID
app.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(product);
});

// Rota POST para adicionar um novo produto
app.post("/products", (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: "Nome e preço são obrigatórios" });
    }

    const newProduct = {
        id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1, // Garante um ID único
        name,
        price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Rota DELETE para remover um produto
app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ error: "Produto não encontrado" });
    }

    products.splice(productIndex, 1); // Remove o produto do array
    res.json({ message: "Produto removido com sucesso" });
});

// Configuração do servidor
const PORT = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

module.exports = app;
