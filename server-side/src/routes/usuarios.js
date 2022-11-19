var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
	usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
	usuarioController.entrar(req, res);
});

router.get("/getNomeDepartamentosComFuncionarios", function (req, res) {
	usuarioController.getNomeDepartamentosComFuncionarios(req, res);
});

router.get("/getDadosFuncionarios", function (req, res) {
	usuarioController.getDadosFuncionarios(req, res);
});

router.put("/putProfileImgId/:imgId/:idFuncionario", function (req, res) {
	usuarioController.putProfileImgId(req, res);
});

module.exports = router;
