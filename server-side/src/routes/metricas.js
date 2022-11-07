var express = require("express");
var router = express.Router();

var metricasController = require("../controllers/metricasController");

router.get("/getDadosComponentes/:idComputador", function (req, res) {
	metricasController.getDadosComponentes(req, res);
});

router.post("/getLeituraComponente", function (req, res) {
	metricasController.getLeituraComponente(req, res);
});

router.post("/getLeituraDepartamentosAVG", function (req, res) {
	metricasController.getLeituraDepartamentosAVG(req, res);
});

module.exports = router;
