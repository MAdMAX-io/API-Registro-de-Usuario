const mongoose = require('mongoose');

/**
 * Coneção com o meu Banco de Dados
 */
mongoose.connect('mongodb+srv://madmax:madmax@cluster0-8b0eo.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    // useMongoClient: true
});

mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

module.exports = mongoose; //Exportação do meu Banco de Dados