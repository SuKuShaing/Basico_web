let ataqueJugador 
let ataqueEnemigo
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
    let botonMascotaJugador = document.getElementById("boton-mascota");
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);  

    let botonFuego = document.getElementById("boton-fuego");
    botonFuego.addEventListener("click", ataqueFuego);
    let botonAgua = document.getElementById("boton-agua");
    botonAgua.addEventListener("click", ataqueAgua);
    let botonTierra = document.getElementById("boton-tierra");
    botonTierra.addEventListener("click", ataqueTierra);
};

function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    let spanMascotaJugador = document.getElementById('mascota-jugador');

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
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');

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
    let spanVidasJugador = document.getElementById("vidas-jugador");
    let spanVidasEnemigo = document.getElementById("vidas-enemigo");


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
};

function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById("Mensajes");

    resultado = resultado.toUpperCase();

    let parrafo = document.createElement("p");
    parrafo.innerHTML = `Tu mascota atacó con ${ataqueJugador} y el enemigo atacó con ${ataqueEnemigo} - ${resultado}`;
    
    sectionMensajes.appendChild(parrafo);
};

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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