const { buscarPorUsuario, criarUsuario } = require("../../database/usuarios");
const validarSenha = require("../../lib/validacaoSenha");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/api/registro", async (req, res) => {
    const { usuarioInput, senhaInput } = req.body;
    if (typeof usuarioInput !== "string" || typeof senhaInput !== "string") {
        return res.status(400).json({ message: "Informe usuário e senha." });
    }

    const erroSenha = validarSenha(senhaInput);
    if (erroSenha) {
        return res.status(400).json({ message: erroSenha });
    }

    const existente = await buscarPorUsuario(usuarioInput);
    if (existente) {
        return res.status(409).json({ message: "Usuário já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senhaInput, 10);
    await criarUsuario(usuarioInput, senhaHash);

    res.status(201).json({ message: "Usuário criado com sucesso" });
});

module.exports = router;