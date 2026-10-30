function precisaDeAutenticacao(req, res, next) {
    if (!req.session.usuarioId) {
        return res.redirect("/Login.html");
    }
    next();
}
module.exports = precisaDeAutenticacao;