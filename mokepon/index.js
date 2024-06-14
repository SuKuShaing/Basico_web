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

    actualizarPosicion(x, y) {
        this.x = x;
        this.y = y;
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
    const nombre = req.body.mokepon || "No se detecta Mokepon"; // Obtiene datos del body
    const mokepon = new Mokepon(nombre);

    // Busca el índice del jugador en el array de jugadores
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id); // esto puede ser negativo si no se encuentra el jugador

    // Si el jugador existe, asigna el mokepon
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon);
    }

    console.log("jugadores: ", jugadores);
    console.log("jugadorId: ", jugadorId);

    res.end(); // se tiene que responder algo, si no, la petición se queda colgada, res.end() es una forma de responder sin enviar nada
});

app.post('/mokepon/:jugadorId/posicion', (req, res) => {
    const jugadorId = req.params.jugadorId || "No se detecta ID usuario"; // en caso de que no venga nada, se le asigna un string vacío
    const x = req.body.x || 0 ; // 0 sí no se detecta posición x
    const y = req.body.y || 0 ; // 0 sí no se detecta posición y

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y);
    }

    // filter compara el elemento y espera un booleano, si es true, lo guarda en el array, si es false, lo descarta
    const enemigos = jugadores.filter((jugador) => jugador.id !== jugadorId); // filtra los jugadores que no sean el jugador actual

    res.send({
        enemigos
    })
});

app.listen(8080, () => {
    console.log("El servidor está escuchando");
});