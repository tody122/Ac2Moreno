const mongoose = require('mongoose');

const Usuario = mongoose.model('Usuario', {
    nome: String,
    email: String
});
module.exports = Usuario;