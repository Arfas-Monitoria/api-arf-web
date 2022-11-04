var express = require("express");
var router = express.Router();

var metricasController = require("../controllers/metricasController");

router.get("/getDadosComponentes/:idComputador", function (req, res) {
	metricasController.getDadosComponentes(req, res);
});

router.get("/getLeituraComponenteTR/:idComponente", function (req, res) {
	metricasController.getLeituraComponenteTR(req, res);
});

router.get("/getLeituraComponenteAVG/:idComponente/:data", function (req, res) {
	metricasController.getLeituraComponenteAVG(req, res);
});

module.exports = router;
