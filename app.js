const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());


const usuarioController = require('./controllers/UsuarioController');
const tarefaController = require('./controllers/TarefaController');

app.use('/usuario', usuarioController);
app.use('/tarefa', tarefaController);


const db_user = 'pedrotodineyb';
const db_pass = 'Todineyb%40210';

mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@ac2moreno.gig9ab2.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen('3000', () => {
            console.log('MongoDB conectado!!!')
            console.log('Servidor iniciado na porta 3000!!!');
        })
    }).catch((error) => {
        console.log(error);
    });