const express = require('express');
const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../Config/auth.json')

/**
 * Chamando a função router do express
 */
const router = express.Router();

/**
 * Config do token do usuario
 */
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, // O tempo que o token deve expirar
    });
}

/**
 * Qunado ele chamar essta rota ele vai cair nessa condição e criar um novo usuario
 */
router.post('/register', async (req, res) => {
    const { email } = req.body; // Estou fazendo uma desestruturação no meu objeto Shcema para recuperar o email

    try{

        if (await User.findOne({ email })) // Essa condição so e ativada se o email ja exestir e for cadastrado novamente
        return res.status(400).send({ error: 'User already exists' }); // ai dara um erro falando que o email ja existe

        const user = await User.create(req.body); // Esse const ele vai receber os dados da requisição 

        user.password = undefined; // Quando for criar o usuario essa expressão não vai retornar para o usuario o password

        return res.send({ 
            user,
            token: generateToken({ id: user.id }), 
        });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

/**
 * Rota para fazer a autenticação do usuario
 */
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body; // Estou recuperando o email e o password do meu usuario

    const user = await User.findOne({ email }).select('+password'); // Estou buscando no meu banco de dados o email do usuario
    
    if (!user) // Se não encontrar o email e o password do usuario a condição If sera ativada
        return res.status(400).send({ erro: 'User not found' }); // OBS: esse if e para verificar se o usuario não existe

    if (!await bcrypt.compare(password, user.password)) // Se a senha bater com a que tem no banco de dados, vai cair nessa condição
        return res.status(400).send({ error: 'Invalid password' }); // OBS: esse if e para verificar se a senha esta correta

    user.password = undefined;  // Quando for criar o usuario essa expressão não vai retornar para o usuario o password 

    res.send({ 
        user, 
        token: generateToken({ id: user.id }), 
    });
});

module.exports = app => app.use('/auth', router);