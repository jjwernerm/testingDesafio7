const express = require('express');
const app = express();

const productos = require("./poductos.json")

app.listen(3000, console.log("SERVER ON"))

app.use(express.json())

app.get("/cafes", (req, res) => {
    res.status(200).send(productos)
})

app.get("/cafes/:id", (req, res) => {
    const { id } = req.params
    const producto = productos.find(p => p.id == id)
    if (producto) res.status(200).send(producto)
    else res.status(404).send({ message: "No se encontró el café" })
})

app.post("/cafes", (req, res) => {
    const producto = req.body
    const { id } = producto
    const existe = productos.some(p => p.id == id)
    if (existe) res.status(400).send({ message: "Ya existe el cafe" })
    else {
        productos.push(producto)
        res.status(201).send(productos)
    }
})

app.put("/cafes/:id", (req, res) => {
    const producto = req.body;
    const { id } = req.params;
    if (id !== producto.id)
        return res
            .status(400)
            .send({
                message: "El id no coincide",
            });

    const encontrarIndex = productos.findIndex((i) => i.id == id);
    if (encontrarIndex >= 0) {
        productos[cafeIndexFound] = producto;
        res.send(productos);
    } else {
        res
            .status(404)
            .send({ message: "No existe id" });
    }
});

app.delete("/cafes/:id", (req, res) => {
    const jwt = req.header("Authorization")
    if (jwt) {
        const { id } = req.params
        const encontrarIndex = productos.findIndex(i => i.id == id)

        if (encontrarIndex >= 0) {
            productos.splice(encontrarIndex, 1)
            console.log(encontrarIndex, productos)
            res.send(productos)
        } else {
            res.status(404).send({ message: "No existe id" })
        }

    } else res.status(400).send({ message: "Token inexistente" })
})

app.use("*", (req, res) => {
    res.status(404).send({ message: "Ruta inexistente" })
})

module.exports = app
