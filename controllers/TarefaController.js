const express = require('express');
const router = express.Router();
const Tarefa = require('../models/tarefa');

router.post('/', async (req, res) => {
    const { nome, estado, dataInicio, dataFim, usuarios } = req.body;
    const tarefa = { nome, estado, dataInicio, dataFim, usuarios };
    try {
        await Tarefa.create(tarefa);
        res.status(201).json(tarefa);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
});
//listar todas as tarefas
router.get('/', async (req, res) => {
    try {
        const tarefas = await Tarefa.find();
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
});

router.get('/:usuarios', async (req, res) => {
    const usuarios = req.params.usuarios;
    try {
        const tarefa = await Tarefa.find({ usuarios: usuarios });
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
});


//colocar tarefa como concluida
router.patch('/:id', async (req, res) => {
    try {
    const id = req.params.id;
    const {estado, usuarios } = req.body;
    const usu = {
        estado, usuarios
    }
    const updateUsu = await Tarefa.updateOne({ _id: id }, usu);
    if (updateUsu.matchedCount === 0) {
    res.status(422).json({ mensagem: "Usuario não encontrado" });
    return
    }
    res.status(200).json(usu);
    } catch (error) {
    res.status(500).json({ error: error });
    }
    });


    router.get('/:dataInicio/:dataFim', async (req, res) => {
       
            const dataInicio = new Date (req.params.dataInicio);
            const dataFim = new Date (req.params.dataFim);
            const query = {
                estado: true,
                dataFim:{
                    $gte: dataInicio,
                    $lte: dataFim
                }
            };
     try {
        const tarefas = await Tarefa.find(query);
            res.status(200).json(tarefas);
        } catch (error) {
            res.status(500).json({ erro: error });
        }
    });

//Deletar tarefa
    router.delete('/:id', async (req, res) => {
        try {
        const id = req.params.id;
        const tarefa = await Tarefa.findOne({ _id: id });
        if (!tarefa) {
        res.status(422).json({ mensagem: "Usuario não encontrado" });
        return;
        }
        await Tarefa.deleteOne({ _id: id });
        res.status(200).json({ mensagem: "Excluído com sucesso!" });
        } catch (error) {
        res.status(500).json({ error: error });
        }
        });

module.exports = router;