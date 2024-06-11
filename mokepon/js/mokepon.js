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

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");


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
let indexAtaqueJugador;
let indexAtaqueEnemigo;


let ataqueJugador; 
let ataqueEnemigo = [];
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let Empates = 0;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './assets/mokemap.webp';
let mascotaJugadorObjeto;
let alturaQueBuscamos;
let AnchoDelMapa = window.innerWidth - 20; // window.innerWidth = ancho de la ventana del navegador
const anchoMaximoDelMapa = 500;

if (AnchoDelMapa > anchoMaximoDelMapa) {
    AnchoDelMapa = anchoMaximoDelMapa;
}

alturaQueBuscamos = AnchoDelMapa * 600 / 800;

mapa.width = AnchoDelMapa;
mapa.height = alturaQueBuscamos;



class Mokepon { // Las clases se escriben con mayúscula
    // Propiedades
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 40;
        this.alto = 40;
        this.x = aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    // Métodos
    pintarMokepon() {
        lienzo.drawImage( // crearImagen(imagen src, posición x, posición y, ancho, alto)
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        );
    }
}

let hipodoge = new Mokepon("Hipodoge", './assets/Hipodoge.png', 5, './assets/Cara hipodoge.webp');
let capipepo = new Mokepon("Capipepo", './assets/Capipepo.png', 5, './assets/Cara capipepo.webp');
let ratigueya = new Mokepon("Ratigueya", './assets/Ratigueya.png', 5, './assets/Cara ratigueya.webp');

let hipodogeEnemigo = new Mokepon("Hipodoge", './assets/Hipodoge.png', 5, './assets/Cara hipodoge.webp');
let capipepoEnemigo = new Mokepon("Capipepo", './assets/Capipepo.png', 5, './assets/Cara capipepo.webp');
let ratigueyaEnemigo = new Mokepon("Ratigueya", './assets/Ratigueya.png', 5, './assets/Cara ratigueya.webp');

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

hipodogeEnemigo.ataques.push(
    {nombre: "💧", id: 'boton-agua'},
    {nombre: "💧", id: 'boton-agua'},
    {nombre: "💧", id: 'boton-agua'},
    {nombre: "🔥", id: 'boton-fuego'},
    {nombre: "🌿", id: 'boton-tierra'}
);

capipepoEnemigo.ataques.push(
    {nombre: "🌿", id: 'boton-tierra'},
    {nombre: "🌿", id: 'boton-tierra'},
    {nombre: "🌿", id: 'boton-tierra'},
    {nombre: "💧", id: 'boton-agua'},
    {nombre: "🔥", id: 'boton-fuego'},
);

ratigueyaEnemigo.ataques.push(
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
    sectionVerMapa.style.display = "none";
    
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
    
    // let imagenDeCapipepo = new Image(); // para decirle que voy a crear una imagen en el canvas
    // imagenDeCapipepo.src = capipepo.foto; // le digo donde buscar la imagen
    // lienzo.fillRect(5, 15, 20, 40); // crearRectangulo(posición x, posición y, ancho, alto)
    
    
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
        reiniciarJuego()
    }

    extraerAtaques(mascotaJugador);
    sectionVerMapa.style.display = "flex";
    iniciarMapa();
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

    // secuenciaAtaques();
};

function secuenciaAtaques() {
    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent == "🔥") {
                ataquesJugador.push("FUEGO");
                // console.log(ataquesJugador);
                boton.style.backgroundColor = '#112f58';
                boton.disabled = true;
            } else if (e.target.textContent == "💧") {
                ataquesJugador.push("AGUA");
                // console.log(ataquesJugador);
                boton.style.backgroundColor = '#112f58';
                boton.disabled = true;
            } else {
                ataquesJugador.push("TIERRA");
                // console.log(ataquesJugador);
                boton.style.backgroundColor = '#112f58';
                boton.disabled = true;
            }
            ataqueAleatorioEnemigo();
        })
    });
};

function seleccionarMascotaEnemigo(enemigo) {
    // let indice = aleatorio(0, mokepones.length - 1);
    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataqueMokeponEnemigo = enemigo.ataques;
    secuenciaAtaques();
};

function ataqueAleatorioEnemigo() {
    // console.log("ataqueMokeponEnemigo ", ataqueMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0, ataqueMokeponEnemigo.length - 1);

    // Aquí se puede usar un array donde estén los ataques del mokonepon enemigo y seleccionar con un index aleatorio 
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("FUEGO");
    } else if (ataqueAleatorio == 2 || ataqueAleatorio == 3) {
        ataqueEnemigo.push("AGUA");
    } else {
        ataqueEnemigo.push("TIERRA");
    }
    // console.log(ataqueEnemigo);
    iniciarPelea();
};

function iniciarPelea() {
    if (ataquesJugador.length === 5) {
        combate();
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataquesJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
};

function combate() {
    for(let index = 0; index < ataquesJugador.length; index++) {

        if (ataquesJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("Empate");
            Empates++; 
        } else if (ataqueEnemigo[index] == 'FUEGO' && ataquesJugador[index] == 'AGUA' || ataqueEnemigo[index] == 'AGUA' && ataquesJugador[index] == 'TIERRA' || ataqueEnemigo[index] == 'TIERRA' && ataquesJugador[index] == 'FUEGO') { 
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
            // vidasEnemigo--;
            // spanVidasEnemigo.innerHTML = vidasEnemigo;
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("Perdiste");
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }

    revisarVidas();


    // if (ataqueEnemigo == ataqueJugador) { // Empate
    //     crearMensaje("Empate");
    // }
    // else if (ataqueEnemigo == 'Fuego' && ataqueJugador == 'Agua' || ataqueEnemigo == 'Agua' && ataqueJugador == 'Tierra' || ataqueEnemigo == 'Tierra' && ataqueJugador == 'Fuego') { 
    //     crearMensaje("Ganaste");
    //     vidasEnemigo--;
    //     spanVidasEnemigo.innerHTML = vidasEnemigo;
    // }
    // else {
    //     crearMensaje("Perdiste");
    //     vidasJugador--;
    //     spanVidasJugador.innerHTML = vidasJugador;
    // }

};

function crearMensaje(resultado) {
    // let notificacion = document.createElement("p");
    let nuevoAtaqueDelJugador = document.createElement("p");
    let nuevoAtaqueDelEnemigo = document.createElement("p");

    resultado = resultado.toUpperCase();

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

    // sectionMensajes.appendChild(notificacion);
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
};

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Empataron");
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Felicitaciones, ganaste!");
    } else {
        crearMensajeFinal("F, perdiste!");
    }
};

function crearMensajeFinal(resultadoFinal) {
    resultadoFinal = resultadoFinal.toUpperCase();

    sectionMensajes.innerHTML = `<strong>${resultadoFinal}</strong>`;

    // botonFuego.disabled = true
    // botonAgua.disabled = true
    // botonTierra.disabled = true

    sectionReiniciar.style.display = "block";
};

function reiniciarJuego() {
    location.reload();
};

function pintarCanvas() {
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height); // limpiar el canvas
    lienzo.drawImage(
        mapaBackground, 
        0,
        0,
        mapa.width, 
        mapa.height
    );
    hipodogeEnemigo.pintarMokepon();
    capipepoEnemigo.pintarMokepon();
    ratigueyaEnemigo.pintarMokepon();
    mascotaJugadorObjeto.pintarMokepon();

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) { // Revisa si hay colisión solo sí se está moviendo
        revisarColision(hipodogeEnemigo); // seleccionar la mascota enemiga
        revisarColision(capipepoEnemigo);
        revisarColision(ratigueyaEnemigo);
    }
};

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5;
};
    
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5;
};

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5;
};

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5;
};

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
};

function sePresionoUnaTecla(evento) {
    console.log(evento.key);
    switch (evento.key) {
        case "ArrowRight":
            moverDerecha();
            break;
        case "ArrowLeft":
            moverIzquierda();
            break;
        case "ArrowDown":
            moverAbajo();
            break;
        case "ArrowUp":
            moverArriba();
            break;
        default:
            // siempre tiene que estar este caso
            break;
    }
};

function iniciarMapa() {
    // mapa.width = 320;
    // mapa.height = 240;
    mascotaJugadorObjeto = obtenerObjetoMascota();
    intervalo = setInterval(pintarCanvas, 50); // para que se actualice la posición del personaje
    window.addEventListener("keydown", sePresionoUnaTecla);
    window.addEventListener("keyup", detenerMovimiento);
};

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            return mokepones[i];
        }
    }
};

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdaMascota = mascotaJugadorObjeto.x;

    if (
        abajoMascota < arribaEnemigo || 
        arribaMascota > abajoEnemigo || 
        derechaMascota < izquierdaEnemigo || 
        izquierdaMascota > derechaEnemigo) {
            return // no hay colisión
    }

    detenerMovimiento();
    clearInterval(intervalo);
    // console.log("Se detectó una Colisión");
    sectionSeleccionarAtaque.style.display = "flex";
    sectionVerMapa.style.display = "none";
    seleccionarMascotaEnemigo(enemigo);
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