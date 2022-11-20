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

		mediaUso = dados.avgUso;

		return [
			{
				nomeComponente: nomeComponente,
				avgUso: Number(mediaUso.toFixed(2)),
			},
		];
	}
}

async function getTeste() {
	var instrucao = `
		select 
		avg(uso) as mediaUso,
		alertaCriticoUso,
		nomeComponente,
		totalComp = (select count(fkComponente) from configuracao join componente on idComponente = fkComponente 
						join computador on idComputador = configuracao.fkComputador 
						join funcionario on idFuncionario = fkFuncionario 
						join departamento on idDepartamento = fkDepartamento
						where statusFuncionario = 'ativo'
						and statusComputador = 'ativo'
						and nomeDepartamento = 'TI Financeira')
		from leitura 
		join computador on computador.idComputador = leitura.fkConfiguracao_Computador
		join configuracao on configuracao.fkComputador = computador.idComputador
		join componente on componente.idComponente = configuracao.fkComponente
		join funcionario on funcionario.idFuncionario = computador.fkFuncionario
		join departamento on departamento.idDepartamento = funcionario.fkDepartamento
		where MONTH(dataLeitura) = month('2022-11'  + '-04') 
		and YEAR(dataLeitura) = YEAR('2022-11' + '-04') 
		and statusFuncionario = 'ativo'
		and statusComputador = 'ativo'
		and nomeDepartamento = 'TI Financeira'
		group by idComponente, alertaCriticoUso, nomeComponente
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);

	var instrucaoMesPassado = `
	select 
	avg(uso) as mediaUso,
	alertaCriticoUso,
	totalComp = (select count(fkComponente) from configuracao 
					join componente on idComponente = fkComponente 
					join computador on idComputador = configuracao.fkComputador 
					join funcionario on idFuncionario = fkFuncionario 
					join departamento on idDepartamento = fkDepartamento
					where statusFuncionario = 'ativo'
					and statusComputador = 'ativo'
					and nomeDepartamento = 'TI Financeira')
	from leitura 
	join computador on computador.idComputador = leitura.fkConfiguracao_Computador
	join configuracao on configuracao.fkComputador = computador.idComputador
	join componente on componente.idComponente = configuracao.fkComponente
	join funcionario on funcionario.idFuncionario = computador.fkFuncionario
	join departamento on departamento.idDepartamento = funcionario.fkDepartamento
	where MONTH(dataLeitura) = month('2022-11'  + '-04')-1
	and YEAR(dataLeitura) = YEAR('2022-11' + '-04') 
	and statusFuncionario = 'ativo'
	and statusComputador = 'ativo'
	and nomeDepartamento = 'TI Financeira'
	group by idComponente, alertaCriticoUso
	`;
	console.log("Executando a instruçãoMesPassado SQL: \n" + instrucaoMesPassado);

	const dadosMesPassado = await database.executar(instrucaoMesPassado);
	const dados = await database.executar(instrucao);

	let qtdComponenteTotalMesPassadoRAM = 0;
	let qtdComponenteMaPerfMesPassadoRAM = 0;
	let qtdComponenteTotalMesPassadoCPU = 0;
	let qtdComponenteMaPerfMesPassadoCPU = 0;
	let qtdComponenteTotalMesPassadoHDD = 0;
	let qtdComponenteMaPerfMesPassadoHDD = 0;

	for (let i = 0; i < dadosMesPassado.length; i++) {
		var obj = dadosMesPassado[i];

		if (obj.mediaUso > obj.alertaCriticoUso && obj.nomeComponente == "CPU") {
			qtdComponenteMaPerfMesPassadoCPU++;
			qtdComponenteTotalMesPassadoCPU++;
		} else if (
			obj.mediaUso > obj.alertaCriticoUso &&
			obj.nomeComponente == "RAM"
		) {
			qtdComponenteMaPerfMesPassadoRAM++;
			qtdComponenteTotalMesPassadoRAM++;
		} else if (
			obj.mediaUso > obj.alertaCriticoUso &&
			obj.nomeComponente == "HDD"
		) {
			qtdComponenteMaPerfMesPassadoHDD++;
			qtdComponenteTotalMesPassadoHDD++;
		}
	}

	var porcentagemCPUMespassado =
		(qtdComponenteMaPerfMesPassadoCPU / qtdComponenteTotalMesPassadoCPU) * 100;
	var porcentagemRAMMespassado =
		(qtdComponenteMaPerfMesPassadoRAM / qtdComponenteTotalMesPassadoRAM) * 100;
	var porcentagemHDDMespassado =
		(qtdComponenteMaPerfMesPassadoHDD / qtdComponenteTotalMesPassadoHDD) * 100;
	// --------------------------------------------
	let qtdComponenteTotalRAM = 0;
	let qtdComponenteMaPerfRAM = 0;
	let qtdComponenteTotalCPU = 0;
	let qtdComponenteMaPerfCPU = 0;
	let qtdComponenteTotalHDD = 0;
	let qtdComponenteMaPerfHDD = 0;

	for (let i = 0; i < dados.length; i++) {
		var obj = dados[i];

		if (obj.mediaUso > obj.alertaCriticoUso && obj.nomeComponente == "CPU") {
			qtdComponenteMaPerfCPU++;
			qtdComponenteTotalCPU++;
		} else if (
			obj.mediaUso > obj.alertaCriticoUso &&
			obj.nomeComponente == "RAM"
		) {
			qtdComponenteMaPerfRAM++;
			qtdComponenteTotalRAM++;
		} else if (
			obj.mediaUso > obj.alertaCriticoUso &&
			obj.nomeComponente == "HDD"
		) {
			qtdComponenteMaPerfHDD++;
			qtdComponenteTotalHDD++;
		}
	}

	var porcentagemCPU = (qtdComponenteMaPerfCPU / qtdComponenteTotalCPU) * 100;
	var porcentagemRAM = (qtdComponenteMaPerfRAM / qtdComponenteMaPerfRAM) * 100;
	var porcentagemHDD = (qtdComponenteMaPerfHDD / qtdComponenteTotalHDD) * 100;

	var diferencaCPU = porcentagemCPU - porcentagemCPUMespassado;
	var diferencaRAM = porcentagemRAM - porcentagemRAMMespassado;
	var diferencaHDD = porcentagemHDD - porcentagemHDDMespassado;

	return [
		{
			porcentagemCPU:
				porcentagemCPU.toFixed(0) == "NaN" ? 0 : porcentagemCPU.toFixed(0),
			porcentagemRAM:
				porcentagemRAM.toFixed(0) == "NaN" ? 0 : porcentagemRAM.toFixed(0),
			porcentagemHDD:
				porcentagemHDD.toFixed(0) == "NaN" ? 0 : porcentagemHDD.toFixed(0),
			diferencaCPU:
				diferencaCPU.toFixed(0) == "NaN" ? 0 : diferencaCPU.toFixed(0),
			diferencaRAM:
				diferencaRAM.toFixed(0) == "NaN" ? 0 : diferencaRAM.toFixed(0),
			diferencaHDD:
				diferencaHDD.toFixed(0) == "NaN" ? 0 : diferencaHDD.toFixed(0),
		},
	];
}

async function getTestePIZZA() {
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
	where MONTH(dataLeitura) = month('2022-11'  + '-04') 
	and YEAR(dataLeitura) = YEAR('2022-11' + '-04') 
	and statusFuncionario = 'ativo'
	and statusComputador = 'ativo'
	and nomeDepartamento = 'TI Financeira'
	group by idComponente, alertaCriticoUso, nomeComponente
				
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);

	const dados = await database.executar(instrucao);
	let qtdComponenteCPU = 0;
	let qtdComponenteHDD = 0;
	let qtdComponenteRAM = 0;
	let qtdTotalComponentes = 0;

	for (let i = 0; i < dados.length; i++) {
		var obj = dados[i];

		if (obj.mediaUso > obj.alertaCriticoUso && obj.nomeComponente == "CPU") {
			console.log("entrou CPU");
			qtdComponenteCPU++;
			qtdTotalComponentes++;
		} else if (
			obj.mediaUso > obj.alertaCriticoUso &&
			obj.nomeComponente == "RAM"
		) {
			console.log("entrou RAM");
			qtdComponenteRAM++;
			qtdTotalComponentes++;
		} else if (
			obj.mediaUso > obj.alertaCriticoUso &&
			obj.nomeComponente == "HDD"
		) {
			console.log("entrou HDD");
			qtdComponenteHDD++;
			qtdTotalComponentes++;
		}
	}
	console.log(qtdTotalComponentes);

	var porcentagemHDD = (qtdComponenteHDD / qtdTotalComponentes) * 100;
	var porcentagemRAM = (qtdComponenteRAM / qtdTotalComponentes) * 100;
	var porcentagemCPU = (qtdComponenteCPU / qtdTotalComponentes) * 100;

	if (qtdTotalComponentes == 0) {
		return [0];
	} else {
		return [
			{
				porcentagemCpu: porcentagemCPU.toFixed(2),
				porcentagemRam: porcentagemRAM.toFixed(2),
				porcentagemHDD: porcentagemHDD.toFixed(2),
			},
		];
	}
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

module.exports = {
	getDadosComponentes,
	getLeituraComponente,
	getLeituraDepartamentosAVG,
	getTeste,
	getTestePIZZA,
	putAlertaCritico
};
