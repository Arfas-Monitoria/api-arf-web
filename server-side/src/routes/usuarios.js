var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
	console.log("moio aqui"); // ????????
	usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
	usuarioController.entrar(req, res);
});

module.exports = router;
