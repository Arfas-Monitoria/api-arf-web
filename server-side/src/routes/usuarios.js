var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
	usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
	usuarioController.entrar(req, res);
});

router.get("/getAllDepartamentos", function (req, res) {
    usuarioController.getAllDepartamentos(req, res);
});

router.get("/getDadosUsuarios", function (req, res) {
    usuarioController.getDadosUsuarios(req, res);
});

module.exports = router;
