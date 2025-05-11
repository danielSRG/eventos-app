const { venderBoletos } = require('./db');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { crearEvento, obtenerEventos, actualizarEvento, eliminarEvento } = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Servir frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Obtener todos los eventos
app.get('/eventos', (req, res) => {
    const eventos = obtenerEventos();
    res.json(eventos);
});

// Obtener un evento por ID
app.get('/eventos/:id', (req, res) => {
    const eventos = obtenerEventos();
    const evento = eventos.find(e => e.id === parseInt(req.params.id));

    if (!evento) {
        return res.status(404).json({ error: "Evento no encontrado" });
    }

    res.json(evento);
});

// Crear un nuevo evento
app.post('/eventos', (req, res) => {
    const evento = crearEvento(req.body);
    res.status(201).json(evento);
});


// Eliminar un evento
app.delete('/eventos/:id', (req, res) => {
    const evento = eliminarEvento(req.params.id);
    if (evento) {
        res.json(evento);
    } else {
        res.status(404).send("Evento no encontrado");
    }
});

// Actualizar un evento
app.put('/eventos/:id', (req, res) => {
    const evento = actualizarEvento(req.params.id, req.body);
    if (evento) {
        res.json(evento);
    } else {
        res.status(404).send("Evento no encontrado");
    }
});


// BONUS: Vender boletos
app.post('/eventos/:id/vender', (req, res) => {
    const { cantidad } = req.body;
    const resultado = venderBoletos(req.params.id, cantidad);
    
    if (resultado.error) {
        return res.status(400).json({ error: resultado.error });
    }

    res.json(resultado);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});