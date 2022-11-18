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

router.get("/getDepartamentos", function (req, res) {
	usuarioController.getDepartamentos(req, res);
});

// estou fazendo isso / trazer dados que o icaro pediu, é quase igual ao de cima 
// com fkDepartamento a mais; 

router.get("/getDadosPerfilFuncionario", function (req, res) {
	usuarioController.getDadosPerfilFuncionario(req, res);
});


module.exports = router;
