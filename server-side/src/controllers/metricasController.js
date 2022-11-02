var metricasModel = require("../models/metricasModel");

function getDadosComponentes(req, res) {
    var idComputador = req.params.idComputador;
	

    metricasModel.getDadosComponentes(idComputador)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado no getDadosComponentes!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function getDadosLeitura(req, res) {
	var idComputador = req.body.idComputador;
	var dateInicio = req.body.dateInicio;
    var dateFim = req.body.dateFim;
    var idComponente = req.body.idComponente;

	if (idComputador == undefined) {
		res.status(400).send("Seu idComputador está undefined!");
	} else if (dateInicio == undefined) {
		res.status(400).send("Sua dateInicio está undefined!");
	} else if (dateFim == undefined) {
		res.status(400).send("Sua dateFim está undefined!");
	}else if (idComponente == undefined) {
		res.status(400).send("Sua idComponente está undefined!");
	}else {
		metricasModel
			.getDadosLeitura(idComputador, dateInicio, dateFim, idComponente)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o getDadosLeitura! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

module.exports = {
	getDadosComponentes,
    getDadosLeitura
};