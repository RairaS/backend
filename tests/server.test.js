const request = require("supertest");
const app = require("../server");

describe("Testando API de Produtos", () => {
    test("GET /products deve retornar lista de produtos", async () => {
        const response = await request(app).get("/products");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: 1, name: "Laptop", price: 2500 },
            { id: 2, name: "Mouse", price: 150 }
        ]);
    });

    test("GET /products/:id deve retornar um produto específico", async () => {
        const response = await request(app).get("/products/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, name: "Laptop", price: 2500 });
    });

    test("GET /products/:id deve retornar 404 para produto inexistente", async () => {
        const response = await request(app).get("/products/999");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Produto não encontrado" });
    });

    test("POST /products deve criar um novo produto", async () => {
        const newProduct = { name: "Teclado", price: 300 };
    
        const response = await request(app)
            .post("/products")
            .send(newProduct);
    
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining(newProduct));
    });

    test("DELETE /products/:id deve remover um produto", async () => {
        const response = await request(app).delete("/products/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Produto removido com sucesso" });

        // Verifica se o produto foi realmente removido
        const checkResponse = await request(app).get("/products/1");
        expect(checkResponse.status).toBe(404);
    });

    test("DELETE /products/:id deve retornar 404 para produto inexistente", async () => {
        const response = await request(app).delete("/products/999");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Produto não encontrado" });
    });
});
