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

function getLeituraComponenteTR(req, res) {
	var idComponente = req.params.idComponente;

	if (idComponente == undefined) {
		res.status(400).send("Sua idComponente está undefined!");
	} else {
		metricasModel
			.getLeituraComponenteTR(idComponente)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o getLeituraComponenteTR! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function getLeituraComponenteAVG(req, res) {
	var idComponente = req.params.idComponente;
	var data = req.params.data;

	if (idComponente == undefined) {
		res.status(400).send("Sua idComponente está undefined!");
	} else if (data == undefined) {
		res.status(400).send("Sua data está undefined!");
	} else {
		metricasModel
			.getLeituraComponenteAVG(idComponente, data)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o getLeituraComponenteAVG! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

module.exports = {
	getDadosComponentes,
	getLeituraComponenteTR,
	getLeituraComponenteAVG,
};
