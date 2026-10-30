const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../../database/connection");
const router = express.Router();
const rateLimit = require("../../middleware/rateLimit");

router.post("/api/login", rateLimit, async (req, res) => {
    const { usuarioInput, senhaInput } = req.body || {};

    if (typeof usuarioInput !== "string" || typeof senhaInput !== "string") {
        return res.status(400).json({ message: "Informe usuário e senha." });
    }

    try {
        const resultado = await pool.query(
            "SELECT id_user, usuario, senha_hash FROM usuarios WHERE usuario = $1",
            [usuarioInput]
        );
        const usuarioEncontrado = resultado.rows[0];

        if (!usuarioEncontrado) {
            return res.status(401).json({ message: "Credenciais inválidas!" });
        }

        const senhaConfere = await bcrypt.compare(
            senhaInput,
            usuarioEncontrado.senha_hash
        );

        if (!senhaConfere) {
            return res.status(401).json({ message: "Credenciais inválidas!" });
        }
req.session.usuarioId = usuarioEncontrado.id_user;
return res.status(200).json({ message: "Login bem-sucedido!" });
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

module.exports = router;