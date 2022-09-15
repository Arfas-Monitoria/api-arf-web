var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
	res.render("index");
});

// , { title: "Express" }

/*
ACIMA DAQUI NÃO SERA USADO APENAS ESTOU USANDO COMO BASE

ABAIXO SERA DO PROJETO ARFAS
*/

module.exports = router;
