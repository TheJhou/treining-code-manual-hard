require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const porta = process.env.PORT || 3000;


app.use(express.json());

app.use(session({
    secret: "segredo_super_secreto",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Defina como true se estiver usando HTTPS
}));

app.use(require("./routes/login"));
app.use(require("./routes/home"));
app.use(express.static(path.join(__dirname, "..", "frontend")));


app.listen(porta, function () {
    console.log(`Servidor disponível em http://localhost:${porta}`);
});