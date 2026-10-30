const JANELA = 5 * 60 * 1000; 

function rateLimit(req, res, next) {
    const agora = Date.now();
    const inicio = req.session.rateLimitInicio;

    if (!inicio || agora - inicio > JANELA) {
req.session.rateLimitInicio = agora;
req.session.rateLimitCount = 1;
        return next();
    }

req.session.rateLimitCount++;
    if (req.session.rateLimitCount > 5) {
        return res.status(429).json({ message: "Limite excedido. Tente mais tarde." });
    }
    next();
}

module.exports = rateLimit;