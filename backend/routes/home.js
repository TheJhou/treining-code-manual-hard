const router = require("express").Router();
const precisaDeAutenticacao = require("../middleware/auth");
const path = require("path");

router.get("/home.html", precisaDeAutenticacao, (req, res) => {
    
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "home.html"));
});

module.exports = router;

