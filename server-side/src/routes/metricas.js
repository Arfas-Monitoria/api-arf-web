var express = require("express");
var router = express.Router();

var metricasController = require("../controllers/metricasController");

router.get("/getDadosComponentes/:idComputador", function (req, res) {
    metricasController.getDadosComponentes(req, res);
});

router.post("/getDadosLeitura", function (req, res) {
	metricasController.getDadosLeitura(req, res);
});

module.exports = router;