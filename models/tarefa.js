const mongoose = require('mongoose');

const Tarefa = mongoose.model('Tarefa', {
    nome: String,
    estado: Boolean,
    dataInicio: Date,
    dataFim: Date,
    usuarios: String
});
module.exports = Tarefa;