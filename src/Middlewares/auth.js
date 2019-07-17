/**
 * Config e para verificara se o token do usuario esta OK, se estviver automaticamente ele vai cair no controller/ projectController.js
 */
const jwt = require('jsonwebtoken');
const authConfig = require('../Config/auth.json');

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization; // Aqui estou buscando o meu header de autorização;

    console.log('authHeader', authHeader);
    
  if (!authHeader) // Se o token não for informado vai ativar esse if
    return res.status(401).send({ error: 'No token provided' });

  const parts = authHeader.split(' '); // essa const esta separando o formato do jwt.
  //OBS: formato JWT começa com um Bearer + hash(yaibfa13e8u8q8q988y)
  console.log('parts', parts);

 if (!parts.length === 2 ) // se na minha const parts não tiver 2 inndex vai retornar que o token e invalido
    return res.status(401).send({ error: 'token error' });

 const [ scheme, token ] = parts; // se o meu token tiver duas partes a var scheme = Bearer e a var token = token
  console.log('scheme',scheme);
  console.log('token', token)
 if (!/^Bearer$/i.test(scheme)) // Se na minha variavel shceme não conter a palavra Bearer esse if é ativado
    return res.status(401).send({ error: 'Token malformatted'});

 jwt.verify(token, authConfig.secret, (err, decoded) => {
     if (err) return res.status(401).send({ error: 'Token invalid' }); 

        req.userId = decoded.id;

        return next();
 });   
};