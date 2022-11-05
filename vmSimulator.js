var database = require("../api-arf-web/server-side/src/configDB/config");
process.env.AMBIENTE_PROCESSO = "local_SQL_SERVER";

gerar();

function gerar() {
	setInterval(gerarDadosComponentes, 2500);
}

async function gerarDadosComponentes() {
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

	lista.map(async (obj) => {
		const tempValue = obj.nomeComponente == "CPU" ? gerarRandomValue() : null;

		var insert = `
    insert into leitura 
    (fkConfiguracao_Computador, fkConfiguracao_Componente, dataLeitura, uso, temperatura) values
    (
      ${obj.idComputador}, 
      ${obj.idComponente}, 
      '${"2022-11-04"}', 
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
