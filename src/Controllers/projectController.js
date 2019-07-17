/**
 * Esse modulo so sera acessado se o usuario tiver com o token autenticado
 */
const express = require('express');
const authMiddleware = require('../Middlewares/auth');

const router = express.Router(); // Buscando o metodo router do express
router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({ ok: true, user: req.userId});
});

module.exports = app => app.use('/projects', router);