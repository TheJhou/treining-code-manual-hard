const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const precisaDeAutenticacao = require("./auth");
const app = express();
const porta = 3000;

const pool = new Pool({
    user: "jhou",
    host: "localhost",
    database: "login_db",
    password: "senha_local",
    port: 5432,
});

app.use(express.json());

app.use(session({
    secret: "segredo_super_secreto",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Defina como true se estiver usando HTTPS
}));

app.post("/api/login", async (req, res) => {
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

app.get("/home.html", precisaDeAutenticacao, (req, res) => {
    if (!req.session.usuarioId) {
        return res.redirect("/Login.html");
    }
    res.sendFile(path.join(__dirname, "..", "frontend", "home.html"));
});

app.use(express.static(path.join(__dirname, "..", "frontend")));

app.listen(porta, function () {
    console.log(`Servidor disponível em http://localhost:${porta}`);
});