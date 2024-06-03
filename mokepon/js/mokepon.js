const botonMascotaJugador = document.getElementById("boton-mascota");
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");

const sectionReiniciar = document.getElementById("reiniciar");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const spanMascotaJugador = document.getElementById('mascota-jugador');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataque-Del-Jugador");
const ataquesDelEnemigo = document.getElementById("ataques-Del-Enemigo");

const contenedorAtaques = document.getElementById("contenedor-Ataques");

let mokepones = [];
let opcionesDeMokepones;
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
let inputHipodoge;
let inputCapipepo;
let inputRatiguey;
let mascotaJugador;
let ataquesMokepon;
let ataqueMokeponEnemigo = [];

let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let ataquesJugador = [];

let ataqueJugador; 
let ataqueEnemigo = [];
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
    {nombre: "💧", id: 'boton-agua'},
    {nombre: "💧", id: 'boton-agua'},
    {nombre: "💧", id: 'boton-agua'},
    {nombre: "🔥", id: 'boton-fuego'},
    {nombre: "🌿", id: 'boton-tierra'}
);

capipepo.ataques.push(
    {nombre: "🌿", id: 'boton-tierra'},
    {nombre: "🌿", id: 'boton-tierra'},
    {nombre: "🌿", id: 'boton-tierra'},
    {nombre: "💧", id: 'boton-agua'},
    {nombre: "🔥", id: 'boton-fuego'},
);

ratigueya.ataques.push(
    {nombre: "🔥", id: 'boton-fuego'},
    {nombre: "🔥", id: 'boton-fuego'},
    {nombre: "🔥", id: 'boton-fuego'},
    {nombre: "💧", id: 'boton-agua'},
    {nombre: "🌿", id: 'boton-tierra'}
);

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none";
    sectionReiniciar.style.display = "none";
    
    mokepones.forEach(mokepon => {
        opcionesDeMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt="Mokepon ${mokepon.nombre}">
            </label>
        `;

        contenedorTarjetas.innerHTML += opcionesDeMokepones;
    });

    inputHipodoge = document.getElementById('Hipodoge');
    inputCapipepo = document.getElementById('Capipepo');
    inputRatigueya = document.getElementById('Ratigueya');

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);    
    botonReiniciar.addEventListener("click", reiniciarJuego);
};

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = "none";
    sectionSeleccionarAtaque.style.display = "flex";

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
    } else {
        alert("Debes seleccionar una mascota");
    }
    
    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
};

function extraerAtaques(mascota) {
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mascota == mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
            break;
        }
    }
    mostrarAtaques(ataques);
};

function mostrarAtaques(ataques) {
    ataques.forEach(ataque => {
        ataquesMokepon = `
            <button class="boton-de-ataque botataque" id=${ataque.id}>${ataque.nombre}</button>
            `;
        contenedorAtaques.innerHTML += ataquesMokepon;
    });

    botonFuego = document.getElementById("boton-fuego");
    botonAgua = document.getElementById("boton-agua");
    botonTierra = document.getElementById("boton-tierra");

    botones = document.querySelectorAll('.botataque');

    secuenciaAtaques();
};

function secuenciaAtaques() {
    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent == "🔥") {
                ataquesJugador.push("FUEGO");
                console.log(ataquesJugador);
                boton.style.backgroundColor = '#112f58';
            } else if (e.target.textContent == "💧") {
                ataquesJugador.push("AGUA");
                console.log(ataquesJugador);
                boton.style.backgroundColor = '#112f58';
            } else {
                ataquesJugador.push("TIERRA");
                console.log(ataquesJugador);
                boton.style.backgroundColor = '#112f58';
            }
            ataqueAleatorioEnemigo();
        })
    });
};

function seleccionarMascotaEnemigo() {
    let indice = aleatorio(0, mokepones.length - 1);
    spanMascotaEnemigo.innerHTML = mokepones[indice].nombre;
    ataqueMokeponEnemigo = mokepones[indice].ataques;
};

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataqueMokeponEnemigo.length - 1);

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("FUEGO");
    } else if (ataqueAleatorio == 2 || ataqueAleatorio == 3) {
        ataqueEnemigo.push("AGUA");
    } else {
        ataqueEnemigo.push("TIERRA");
    }

    console.log(ataqueEnemigo);

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