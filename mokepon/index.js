const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const jugadores = [];

class Jugador {
    constructor(id) {
        this.id = id;
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon;
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre;
    }
}

app.get('/unirse', (req, res) => {
    const id = `${Math.floor(Math.random() * 10000)}`;

    const jugador = new Jugador(id);

    jugadores.push(jugador);

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.send(id);
});

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || "No se detecta ID usuario"; // en caso de que no venga nada, se le asigna un string vacío
    const nombre = req.body.mokepon || "No se detecta Mokepon";
    const mokepon = new Mokepon(nombre);

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon);
    }

    console.log("jugadores: ", jugadores);
    console.log("jugadorId: ", jugadorId);
    res.end();
});

app.listen(8080, () => {
    console.log("El servidor está escuchando");
});