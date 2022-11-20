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

function getTeste(req, res) {
	metricasModel
		.getTeste()
		.then(function (resultado) {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).send("Nenhum resultado encontrado no getTeste!");
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

function getTeste(req, res) {
	metricasModel
		.getTeste()
		.then(function (resultado) {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).send("Nenhum resultado encontrado no getTeste!");
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

function getTestePIZZA(req, res) {
	metricasModel
		.getTestePIZZA()
		.then(function (resultado) {
			if (resultado.length > 0) {
				res.status(200).json(resultado);
			} else {
				res.status(204).send("Nenhum resultado encontrado no getTeste!");
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

function putAlertaCritico(req, res) {
	var idComponente = req.body.idComponente;
	var alertaCriticoUso = req.body.alertaCriticoUso;
	var alertaCriticoTemp = req.body.alertaCriticoTemp || null;

	if (idComponente == undefined) {
		res.status(400).send("Sua idComponente está undefined!");
	} else if (alertaCriticoUso == undefined) {
		res.status(400).send("Sua alertaCriticoUso está undefined!");
	} else {
		metricasModel
			.putAlertaCritico(idComponente, alertaCriticoUso, alertaCriticoTemp)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o putAlertaCritico! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

function getLeituraDepartamentosAVG(req, res) {
	var dataInicio = req.body.dataInicio;
	var dataFim = req.body.dataFim;
	var nomeDepartamento = req.body.nomeDepartamento;
	var nomeComponente = req.body.nomeComponente;

	if (dataInicio == undefined) {
		res.status(400).send("Sua dataInicio está undefined!");
	} else if (dataFim == undefined) {
		res.status(400).send("Sua dataFim está undefined!");
	} else if (nomeDepartamento == undefined) {
		res.status(400).send("Sua nomeDepartamento está undefined!");
	} else if (nomeComponente == undefined) {
		res.status(400).send("Sua nomeComponente está undefined!");
	} else {
		metricasModel
			.getLeituraDepartamentosAVG(
				dataInicio,
				dataFim,
				nomeDepartamento,
				nomeComponente,
			)
			.then(function (resultado) {
				res.json(resultado);
			})
			.catch(function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o getLeituraDepartamentosAVG! Erro: ",
					erro.sqlMessage,
				);
				res.status(500).json(erro.sqlMessage);
			});
	}
}

module.exports = {
	getDadosComponentes,
	getLeituraComponente,
	getLeituraDepartamentosAVG,
	getTeste,
	getTestePIZZA,
	putAlertaCritico
};
