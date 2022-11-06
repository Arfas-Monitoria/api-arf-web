var database = require("../api-arf-web/server-side/src/configDB/config");
process.env.AMBIENTE_PROCESSO = "local_SQL_SERVER";

let DaysSubtractor = 0;
let dadosGerados = 0;

const pastDays = 10;
const qtdDadosAGerar = 5;

gerarDados();

async function gerarDados() {
	while (pastDays - DaysSubtractor != 0) {
		await gerarDadosComponentes(pastDays - DaysSubtractor);
		dadosGerados++;

		if (dadosGerados == qtdDadosAGerar) {
			DaysSubtractor++;
			dadosGerados = 0;
		}
	}
	while (true) await gerarDadosComponentes(0);
}

async function gerarDadosComponentes(startDay) {
	var instrucao = `
    select idComputador, idComponente, nomeComponente
    from funcionario
    join computador on idFuncionario = fkFuncionario
    join configuracao on idComputador = fkComputador
    join componente on idComponente = fkComponente
    where statusFuncionario = 'ativo';
  `;

	lista = await database.executar(instrucao).then((resultado) => {
		return resultado;
	});

	await lista.map(async (obj) => {
		const tempValue = obj.nomeComponente == "CPU" ? gerarRandomValue() : null;

		var insert = `
	  insert into leitura
	  (fkConfiguracao_Computador, fkConfiguracao_Componente, dataLeitura, uso, temperatura) values
	  (
	    ${obj.idComputador},
	    ${obj.idComponente},
	    '${getDataHoje(startDay)}',
	    ${gerarRandomValue()},
	    ${tempValue}
	  )
	  `;

		console.log("Executando a instrução SQL: \n" + insert);
		await database.executar(insert);
	});
}

function gerarRandomValue() {
	let min = 0;
	let max = 100;

	return Math.ceil(Math.random() * (max - min) + min);
}

function getDataHoje(startDay = 0) {
	var date = new Date();
	var last = new Date(date.getTime() - startDay * 24 * 60 * 60 * 1000);
	var dd = last.getDate();
	var mm = last.getMonth() + 1;
	var yyyy = last.getFullYear();

	return yyyy + "-" + mm + "-" + dd;
}
