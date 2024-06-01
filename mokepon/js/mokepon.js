const botonMascotaJugador = document.getElementById("boton-mascota");
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const botonFuego = document.getElementById("boton-fuego");
const botonAgua = document.getElementById("boton-agua");
const botonTierra = document.getElementById("boton-tierra");
const sectionReiniciar = document.getElementById("reiniciar");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const inputHipodoge = document.getElementById('hipodoge');
const inputCapipepo = document.getElementById('capipepo');
const inputRatigueya = document.getElementById('ratigueya');
const spanMascotaJugador = document.getElementById('mascota-jugador');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataque-Del-Jugador");
const ataquesDelEnemigo = document.getElementById("ataques-Del-Enemigo");

let mokepones = [];

let ataqueJugador; 
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;


class Mokepon { // Las clases se escriben con mayúscula
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
} 

let hipodoge = new Mokepon("Hipodoge", './assets/Hipodoge.png', 5);
let capipepo = new Mokepon("Capipepo", './assets/Capipepo.png', 5);
let ratigueya = new Mokepon("Ratigueya", './assets/Ratigueya.png', 5);

mokepones.push(hipodoge, capipepo, ratigueya);

hipodoge.ataques.push(
    {nombre: "Tsunami 💧", id: 'boton-agua'},
    {nombre: "Marepoto 💧", id: 'boton-agua'},
    {nombre: "chorro de agua 💧", id: 'boton-agua'},
    {nombre: "lanza llamas 🔥", id: 'boton-fuego'},
    {nombre: "Corta 🌿", id: 'boton-tierra'}
);

capipepo.ataques.push(
    {nombre: "ventisca primavera 🌿", id: 'boton-tierra'},
    {nombre: "golpe rama 🌿", id: 'boton-tierra'},
    {nombre: "hojas filudas 🌿", id: 'boton-tierra'},
    {nombre: "Marepoto 💧", id: 'boton-agua'},
    {nombre: "lanza llamas 🔥", id: 'boton-fuego'},
);

ratigueya.ataques.push(
    {nombre: "lanza llamas 🔥", id: 'boton-fuego'},
    {nombre: "Encierro 🔥", id: 'boton-fuego'},
    {nombre: "Meteoro 🔥", id: 'boton-fuego'},
    {nombre: "chorro de agua 💧", id: 'boton-agua'},
    {nombre: "Corta 🌿", id: 'boton-tierra'}
);

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none";
    sectionReiniciar.style.display = "none";
    
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);    
    botonFuego.addEventListener("click", ataqueFuego);    
    botonAgua.addEventListener("click", ataqueAgua);
    botonTierra.addEventListener("click", ataqueTierra);    
    botonReiniciar.addEventListener("click", reiniciarJuego);
};

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = "none";
    sectionSeleccionarAtaque.style.display = "flex";

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Hipodoge";
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo";
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya";
    } else {
        alert("Debes seleccionar una mascota");
    }

    seleccionarMascotaEnemigo();
};

function seleccionarMascotaEnemigo() {
    let indice = aleatorio(0, 2);
    let mascotas = ["Hipodoge", "Capipepo", "Ratigueya"];
    spanMascotaEnemigo.innerHTML = mascotas[indice];
};

function ataqueFuego() {
    ataqueJugador = "Fuego";
    ataqueAleatorioEnemigo();
};

function ataqueAgua() {
    ataqueJugador = "Agua";
    ataqueAleatorioEnemigo();
};

function ataqueTierra() {
    ataqueJugador = "Tierra";
    ataqueAleatorioEnemigo();
};

function ataqueAleatorioEnemigo() {
    opcionesDeAtaques = ["Fuego", "Agua", "Tierra"];
    let indice = aleatorio(0, 2);
    ataqueEnemigo = opcionesDeAtaques[indice];

    combate();
};

function combate() {
    if (ataqueEnemigo == ataqueJugador) { // Empate
        crearMensaje("Empate");
    }
    else if (ataqueEnemigo == 'Fuego' && ataqueJugador == 'Agua' || ataqueEnemigo == 'Agua' && ataqueJugador == 'Tierra' || ataqueEnemigo == 'Tierra' && ataqueJugador == 'Fuego') { 
        crearMensaje("Ganaste");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    }
    else {
        crearMensaje("Perdiste");
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    revisarVidas();
};

function crearMensaje(resultado) {
    // let notificacion = document.createElement("p");
    let nuevoAtaqueDelJugador = document.createElement("p");
    let nuevoAtaqueDelEnemigo = document.createElement("p");

    resultado = resultado.toUpperCase();

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

    // sectionMensajes.appendChild(notificacion);
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
};

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("Felicitaciones, ganaste!");

    } else if (vidasJugador == 0) {
        crearMensajeFinal("F, perdiste!");
    }
};

function crearMensajeFinal(resultadoFinal) {
    resultadoFinal = resultadoFinal.toUpperCase();

    sectionMensajes.innerHTML = `<strong>${resultadoFinal}</strong>`;

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    sectionReiniciar.style.display = "block";
};

function reiniciarJuego() {
    location.reload();
};

window.addEventListener("load", iniciarJuego);





/*
Eventos que podemos escuchar con: addEventListener("")

blur = Cuando el elemento pierde el foco.
click = El usuario hace clic sobre el elemento.
dblclick = El usuario hace doble clic sobre el elemento.
focus = El elemento gana el foco.
keydown = El usuario presiona una tecla.
keypress = El usuario presiona una tecla y la mantiene pulsada.
keyup = El usuario libera la tecla.
load = El documento termina su carga.
mousedown = El usuario presiona el botón del ratón en un elemento.
mousemove = El usuario mueve el puntero del ratón sobre un elemento.
mouseout = El usuario mueve el puntero fuera de un elemento.
mouseover = El usuario mantiene el puntero sobre un elemento.
mouseup = El usuario libera el botón pulsado del ratón sobre un elemento.
*/