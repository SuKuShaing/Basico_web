// Para ejecutar el servidor y el juego, se debe correr el comando node index.js en la terminal, en la carpeta mokepon

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static('public'));
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

    actualizarAtaques(ataques) {
        this.ataques = ataques;
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre;
    }
}

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mokepon.html'));
});

// al unirse con el servidor, se le asigna un id al jugador
app.get('/unirse', (req, res) => {
    const id = `${Math.floor(Math.random() * 10000)}`;

    const jugador = new Jugador(id);

    jugadores.push(jugador);

    res.setHeader('Access-Control-Allow-Origin', '*'); // permite que cualquier origen acceda a la API, para evitar problemas de CORS (el cual es por hacer solicitudes desde un dominio diferente al del servidor), setHeader establece en la respuesta un header con el nombre Access-Control-Allow-Origin y el valor *, que significa que cualquier origen puede acceder a la API

    res.send(id); // responde con el id del jugador
});

// el jugador envía el mokepon seleccionado al servidor y se guarda en su objeto-perfil
app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || "No se detecta ID usuario"; // en caso de que no venga nada, se le asigna un string
    const nombre = req.body.mokepon || "No se detecta Mokepon"; // Obtiene datos del body, el body es lo que viene en el json
    const mokepon = new Mokepon(nombre);

    // Busca el índice del jugador en el array de jugadores
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id); // esto es negativo (-1) si no se encuentra el jugador

    // Si el jugador existe, asigna el mokepon
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon);
    }

    console.log("jugadores: ", jugadores);
    console.log("jugadorId: ", jugadorId);

    res.end(); // se tiene que responder algo, si no, la petición se queda colgada, res.end() es una forma de responder sin enviar nada
});

// el jugador envía la posición al servidor y se guarda en su objeto-perfil
app.post('/mokepon/:jugadorId/posicion', (req, res) => {
    const jugadorId = req.params.jugadorId || "No se detecta ID usuario"; // en caso de que no venga nada, se le asigna un string vacío
    const x = req.body.x || 0 ; // 0 sí no se detecta posición x
    const y = req.body.y || 0 ; // 0 sí no se detecta posición y

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id) // para encontrar el indice del jugador en el array de jugadores

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y);
    }

    const enemigos = jugadores.filter((jugador) => jugador.id !== jugadorId); // filtra los jugadores que no sean el jugador actual
    // filter compara el elemento y espera un booleano, si es true, lo guarda en el array, si es false, lo descarta

    res.send({
        enemigos
        // envía un objeto con la lista de enemigos, cada objeto en la lista es un jugador con su mokepon y la posición de este
        // Los comentario en en un objeto se hacen en otra linea, no en la misma, sino genera un error
    })
});

app.get('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || "No se detecta ID usuario"; // en caso de que no venga nada, se le asigna un string vacío
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId); // busca el jugador en el array de jugadores
    res.send({
        ataques: jugador.ataques || [] // envía un objeto con la lista de ataques del jugador, si no hay ataques, envía una lista vacía
    })
})

// Mensaje cuando se enciende el servidor
app.listen(8080, () => {
    console.log("El servidor está escuchando");
});

// el jugador envía los ataques seleccionados al servidor y se guardan en su objeto-perfil
app.post('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || "No se detecta ID usuario"; // en caso de que no venga nada, se le asigna un string vacío
    const ataques = req.body.ataques || [] ; // lista vacía sí no se detecta nada, se le debe asignar lo mismo que se envía pero vació

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarAtaques(ataques);
    }

    res.end()
})