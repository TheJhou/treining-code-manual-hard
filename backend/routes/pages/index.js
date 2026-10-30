const express = require("express");
const router = express.Router();

// rota da raiz — despachante
router.get("/", (req, res) => {
    if (req.session.usuarioId) {
        return res.redirect("/home.html");
    }
    res.redirect("/Login.html");
});

router.use(require("./home"));     // mesma pasta → ./home
router.use(require("./login"));

module.exports = router;