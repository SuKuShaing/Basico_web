function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function eleccion(jugada) {
    let resultado = "";
    if (jugada == 1) {
        resultado = "Piedra 🥌"
    }
    else if (jugada == 2) {
        resultado = "Papel 🧻"
    }
    else if (jugada == 3) {
        resultado = "Tijera ✂️"
    }
    else {
        return "MAL ELEGIDO"
    }
    return resultado;
}

// 1 Piedra
// 2 Papel
// 3 Tijera

let jugador = 0;
let pc = 0;
let min = 1;
let max = 3;
let triunfos = 0;
let perdidas = 0;

while (triunfos < 3 && perdidas < 3) {
    pc = aleatorio(min, max);
    jugador = prompt("¿Qué eliges un número?\n1. Piedra\n2. Papel\n3. Tijera");

    // Mostrar elecciones de los jugadores
    alert("PC elige " + eleccion(pc));
    alert("Jugador elige " + eleccion(jugador));

    // Combate
    if (pc == jugador) { // Empate
        alert("Empate");
    }
    else if (pc == 1 && jugador == 2 || pc == 2 && jugador == 3 || pc == 3 && jugador == 1) { 
        // pc = piedra y jugador = papel  // pc = papel y jugador = tijera  // pc = tijera y jugador = piedra -> gana jugador
        alert("Ganaste");
        triunfos++;
    }
    else {
        alert("Perdiste");
        perdidas++;
    }

    alert(`Triunfos: ${triunfos} veces.\nPerdidas: ${perdidas} veces.`);
}