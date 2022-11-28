var database = require("../configDB/config");

function getDadosComponentes(idComputador) {
	var instrucao = `
	SELECT idComponente,nomeComponente,capacidade,alertaCriticoUso,alertaCriticoTemperatura
	FROM componente 
	JOIN configuracao ON idComponente = configuracao.fkComponente
    JOIN computador ON configuracao.fkComputador = idComputador
    WHERE idComputador = ${idComputador}
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

async function getDadosMaquinas(onlyNotOwned) {
	var instrucaoComFuncionarios = `
	select marca, modelo, idProduto, idDispositivo, statusComputador, idComputador,
	Format(dtEntrega, 'yyyy-MM-dd') as dtEntrega, 
	Format(dtDevolucao, 'yyyy-MM-dd') as dtDevolucao, 
	hostname, usuario, nomeFuncionario, idFuncionario
	from departamento
	join funcionario on idDepartamento = fkDepartamento
	join computador on idFuncionario = fkFuncionario;
    `;

	var instrucaoSemFuncionarios = `
	select marca, modelo, idProduto, idDispositivo, statusComputador, 
	Format(dtEntrega, 'yyyy-MM-dd') as dtEntrega, 
	Format(dtDevolucao, 'yyyy-MM-dd') as dtDevolucao, hostname, idComputador 
	from computador where fkFuncionario is null
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSemFuncionarios);
	const dadosSemFuncionarios = await database.executar(instrucaoSemFuncionarios);

	if (onlyNotOwned == 'true') {
		return dadosSemFuncionarios;
	}

	console.log("Executando a instrução SQL: \n" + instrucaoComFuncionarios);
	const dadosComFuncionarios = await database.executar(instrucaoComFuncionarios);

	return [...dadosComFuncionarios, ...dadosSemFuncionarios]
}

function getLeituraComponente(idComponente, data) {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, "0");
	var mm = String(today.getMonth() + 1).padStart(2, "0");
	var yyyy = today.getFullYear();

	today = yyyy + "-" + mm + "-" + dd;

	console.log(`${data} === ${today}`, data == today);

	if (data == today) {
		var instrucao = `
        select top 1 nomeComponente,
        uso as uso,
        temperatura as temperatura
        from leitura join componente on idComponente = fkConfiguracao_Componente
        where dataLeitura = FORMAT(DATEADD(HOUR,-3, getdate()), 'yyyy-MM-dd')
        and idComponente = ${idComponente}
        order by idLeitura desc
    `;
	} else {
		var instrucao = `
        select nomeComponente,
        avg(uso) as uso,
        avg(temperatura) as temperatura
        from leitura join componente on idComponente = fkConfiguracao_Componente
        where idComponente = ${idComponente}
        and dataLeitura = '${data}'
        group by nomeComponente
    `;
	}
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

async function getLeituraDepartamentosAVG(
	dataInicio,
	dataFim,
	nomeDepartamento,
	nomeComponente,
) {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, "0");
	var mm = String(today.getMonth() + 1).padStart(2, "0");
	var yyyy = today.getFullYear();

	today = yyyy + "-" + mm + "-" + dd;

	if (dataInicio == today && dataFim == today) {
		var instrucao = `
		select A.idComputador, count(A.rowNumber), avg(A.uso) as avgUso
		from (select idComputador, ROW_NUMBER() OVER(PARTITION BY idComputador order by idComputador) 
    as rowNumber,
			uso
			from leitura
			join componente on idComponente = fkConfiguracao_Componente
			join computador on fkConfiguracao_Computador = idComputador
			join funcionario on idFuncionario = fkFuncionario
			join departamento on fkDepartamento = idDepartamento
			where dataLeitura between '${today}' and '${today}'
			and nomeDepartamento = '${nomeDepartamento}'
			and nomeComponente = '${nomeComponente}') as A
			where rowNumber <= 1
			group by A.idComputador
		`;
		const dados = await database.executar(instrucao);

		avgUsoTotal = 0;
		avgTempTotal = 0;

		for (let i = 0; i < dados.length; i++) {
			avgUsoTotal += dados[i].avgUso;
			avgTempTotal += dados[i].avgTemp;
		}

		const mediaUso = avgUsoTotal / dados.length;

		return [
			{
				nomeComponente: nomeComponente,
				avgUso: Number(mediaUso.toFixed(2)),
			},
		];
	} else {
		var instrucao = `
		select nomeComponente, 
			avg(uso) as avgUso
			from leitura
			join componente on idComponente = fkConfiguracao_Componente
			join computador on fkConfiguracao_Computador = idComputador
			join funcionario on idFuncionario = fkFuncionario
			join departamento on fkDepartamento = idDepartamento
			where dataLeitura between '${dataInicio}' and '${dataFim}'
			and nomeDepartamento = '${nomeDepartamento}'
			and nomeComponente = '${nomeComponente}'
			group by nomeComponente
		`;
		console.log("Executando a instrução SQL: \n" + instrucao);
		const dados = (await database.executar(instrucao))[0];

		mediaUso = dados?.avgUso || null;

		return [
			{
				nomeComponente: nomeComponente,
				avgUso: Number(mediaUso?.toFixed(2)),
			},
		];
	}
}

async function getKPIsDepartamento(departamento, mes) {
	var instrucao = `
		select 
		avg(uso) as mediaUso,
		alertaCriticoUso,
		nomeComponente
		from leitura 
		join computador on computador.idComputador = leitura.fkConfiguracao_Computador
		join configuracao on configuracao.fkComputador = computador.idComputador
		join componente on componente.idComponente = configuracao.fkComponente
		join funcionario on funcionario.idFuncionario = computador.fkFuncionario
		join departamento on departamento.idDepartamento = funcionario.fkDepartamento
		where MONTH(dataLeitura) = month('${mes}'  + '-04') 
		and YEAR(dataLeitura) = YEAR('${mes}' + '-04') 
		and statusFuncionario = 'ativo'
		and statusComputador = 'Disponível'
		and nomeDepartamento = '${departamento}'
		group by idComponente, alertaCriticoUso, nomeComponente
    `;
	// console.log("Executando a instrução SQL: \n" + instrucao);

	var instrucaoMesPassado = `
	select 
	avg(uso) as mediaUso, nomeComponente, alertaCriticoUso
	from leitura 
	join computador on computador.idComputador = leitura.fkConfiguracao_Computador
	join configuracao on configuracao.fkComputador = computador.idComputador
	join componente on componente.idComponente = configuracao.fkComponente
	join funcionario on funcionario.idFuncionario = computador.fkFuncionario
	join departamento on departamento.idDepartamento = funcionario.fkDepartamento
	where MONTH(dataLeitura) = month('${mes}'  + '-04')-1
	and YEAR(dataLeitura) = YEAR('${mes}' + '-04') 
	and statusFuncionario = 'ativo'
	and statusComputador = 'Disponível'
	and nomeDepartamento = '${departamento}'
	group by nomeComponente, alertaCriticoUso
	`;
	// console.log("Executando a instruçãoMesPassado SQL: \n" + instrucaoMesPassado);

	let dadosMesAtual = await database.executar(instrucao);
	let dadosMesPassado = await database.executar(instrucaoMesPassado);

	console.log('dadosMesPassado: ', dadosMesPassado)

	function calcularPorcentagem(dados) {
		let qtdTotalComponentesRuins = 0;

		let qtdCPUs = 0;
		let qtdRAMs = 0;
		let qtdHDDs = 0;

		let qtdCPUsRuins = 0;
		let qtdRAMsRuins = 0;
		let qtdHDDsRuins = 0;

		for (const dado of dados) {
			if (dado.alertaCriticoUso == null) continue;

			switch (dado.nomeComponente) {
				case 'CPU':
					qtdCPUs++
					if (dado.mediaUso >= dado.alertaCriticoUso) {
						qtdCPUsRuins++
						qtdTotalComponentesRuins++;
					}
					break;
				case 'RAM':
					qtdRAMs++
					if (dado.mediaUso >= dado.alertaCriticoUso) {
						qtdRAMsRuins++
						qtdTotalComponentesRuins++;
					}
					break;
				case 'HDD':
					qtdHDDs++
					if (dado.mediaUso >= dado.alertaCriticoUso) {
						qtdHDDsRuins++
						qtdTotalComponentesRuins++;
					}
					break;
			}
		}

		const porcentagemCPU = (qtdCPUsRuins / qtdCPUs) * 100;
		const porcentagemRAM = (qtdRAMsRuins / qtdRAMs) * 100;
		const porcentagemHDD = (qtdHDDsRuins / qtdHDDs) * 100;

		const fracaoCPU = (qtdCPUsRuins / qtdTotalComponentesRuins) * 100;
		const fracaoRAM = (qtdRAMsRuins / qtdTotalComponentesRuins) * 100;
		const fracaoHDD = (qtdHDDsRuins / qtdTotalComponentesRuins) * 100;

		return {
			porcentagemCPU,
			porcentagemRAM,
			porcentagemHDD,
			fracaoCPU,
			fracaoRAM,
			fracaoHDD
		}
	}

	dadosMesAtual = calcularPorcentagem(dadosMesAtual);
	dadosMesPassado = calcularPorcentagem(dadosMesPassado);

	console.log(dadosMesAtual)
	console.log(dadosMesPassado)

	console.log(dadosMesAtual.porcentagemCPU)
	console.log(dadosMesPassado.porcentagemCPU)
	console.log(Number(dadosMesAtual.porcentagemCPU) - Number(dadosMesPassado.porcentagemCPU))

	const diferencaCPU = Number(dadosMesAtual.porcentagemCPU) - Number(dadosMesPassado.porcentagemCPU)
	const diferencaRAM = dadosMesAtual.porcentagemRAM - dadosMesPassado.porcentagemRAM
	const diferencaHDD = dadosMesAtual.porcentagemHDD - dadosMesPassado.porcentagemHDD

	return [
		{
			CPU: {
				"porcentagem": Number(dadosMesAtual.porcentagemCPU.toFixed(0)),
				"diferenca": Number(diferencaCPU.toFixed(0)),
				"fracao": dadosMesAtual.fracaoCPU
			},
			RAM: {
				"porcentagem": Number(dadosMesAtual.porcentagemRAM.toFixed(0)),
				"diferenca": Number(diferencaRAM.toFixed(0)),
				"fracao": dadosMesAtual.fracaoRAM
			},
			HDD: {
				"porcentagem": Number(dadosMesAtual.porcentagemHDD.toFixed(0)),
				"diferenca": Number(diferencaHDD.toFixed(0)),
				"fracao": dadosMesAtual.fracaoHDD
			}
		}
	];
}

function putAlertaCritico(idComponente, alertaCriticoUso, alertaCriticoTemp) {
	var instrucao = `
	UPDATE configuracao
	SET alertaCriticoUso = ${alertaCriticoUso}, alertaCriticoTemperatura = ${alertaCriticoTemp}
	WHERE fkComponente = ${idComponente};
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function putDadosMaquina(idFuncionario, statusPC, dtEntrega, dtDevolucao, idPC) {
	var instrucao = `
	update computador set 
		fkFuncionario = ${idFuncionario},
		statusComputador = '${statusPC}',
		dtEntrega = ${dtEntrega},
		dtDevolucao = ${dtDevolucao}
	where idComputador = ${idPC};
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}


module.exports = {
	getDadosComponentes,
	getLeituraComponente,
	getLeituraDepartamentosAVG,
	putAlertaCritico,
	getKPIsDepartamento,
	getDadosMaquinas,
	putDadosMaquina,
};
