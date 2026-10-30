const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if (req.session.usuarioId) {
        return res.redirect("/home.html");
    }
    res.redirect("/Login.html");
});

router.use(require("./home"));
router.use(require("./login"));
router.use(require("./registro"));

module.exports = router;