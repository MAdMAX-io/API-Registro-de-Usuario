const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // Utilizando o metodo do Express

app.use(bodyParser.json()); // To convertendo as requições para o formato JSON
app.use(bodyParser.urlencoded({ extended: false })); //  Config para entender os parametros via URL

/**
 * Referenciando as minhas rotas
 */
require('./Controllers/authController')(app);
require('./Controllers/projectController')(app);

app.listen(3001); //Port da minha API