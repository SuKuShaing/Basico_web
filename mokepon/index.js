const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hola usuario');
});

app.listen(8080, () => {
    console.log("El servidor está escuchando");
});