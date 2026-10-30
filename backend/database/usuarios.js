const pool = require("./connection");

async function buscarPorUsuario(usuario) {
    const resultado = await pool.query(
        "SELECT id_user, usuario, senha_hash FROM usuarios WHERE usuario = $1",
        [usuario]
    );
    return resultado.rows[0];
}

async function criarUsuario(usuario, senhaHash) {
    await pool.query(
        "INSERT INTO usuarios (usuario, senha_hash) VALUES ($1, $2)",
        [usuario, senhaHash]
    );
    return true;
}

module.exports = {
    buscarPorUsuario,
    criarUsuario
};
