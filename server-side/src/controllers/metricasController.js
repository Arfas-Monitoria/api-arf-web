var metricasModel = require("../models/metricasModel");

function getDadosComponentes(req, res) {
	var idComputador = req.params.idComputador;

	metricasModel
		.getDadosComponentes(idComputador)
		.then(function (resultado) {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res
					.status(204)
					.send("Nenhum resultado encontrado no getDadosComponentes!");
			}
		})
		.catch(function (erro) {
			console.log(erro);
			console.log(
				"Houve um erro ao realizar a consulta! Erro: ",
				erro.sqlMessage,
			);
			res.status(500).json(erro.sqlMessage);
		});
}

function getLeituraComponente(req, res) {
	var idComponente = req.body.idComponente;
	var data = req.body.data;

	if (idComponente == undefined) {
		res.status(400).send("Sua idComponente está undefined!");
	} else if (data == undefined) {
		res.status(400).send("Sua data está undefined!");
	} else {
		metricasModel
			.getLeituraComponente(idComponente, data)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o getLeituraComponente! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

module.exports = {
	getDadosComponentes,
	getLeituraComponente,
};
