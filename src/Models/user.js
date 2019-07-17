const mongoose = require('../DataBase/index');
const bcrypt = require('bcryptjs'); // Lib para fazer a criptação do password

/**
 * Config dos campos do meu Banco de Dados
 */
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

/**
 * Config a criptação do password, o UserSchema.pre('save') quer dizer que antes de salvar faça a regra de negocio pre defenida 
 */
UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema); // Coloquei o nome do meu Schema de User

module.exports = User;