const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios');

router.post('/', async (req, res) => {
    const { nome, email } = req.body;
    const usuario = { nome, email };
    try {
        await Usuario.create(usuario);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
});


router.get('/', async (req, res) => {
    try {
        const usuario = await Usuario.find();
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
});

/*
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const aluno = await Aluno.findOne({ _id: id });
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
});
*/
module.exports = router;
