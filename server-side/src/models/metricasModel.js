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
        where dataLeitura = CAST( GETDATE() AS Date )
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

function getLeituraDepartamentosAVG(
	dataInicio,
	dataFim,
	nomeDepartamento,
	nomeComponente,
) {
	var instrucao = `
	select nomeComponente, CONVERT(VARCHAR(8), GETDATE(), 108) as horaLeitura, 
		avg(uso) as avgUso, avg(temperatura) as avgTemperatura 
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
	return database.executar(instrucao);
	
}

async function getTeste() {
	var instrucao = `
		select 
		avg(uso) as mediaUso,
		alertaCriticoUso,
		totalComp = (select count(fkComponente) from configuracao join componente on idComponente = fkComponente 
						join computador on idComputador = fkComputador 
						join funcionario on idFuncionario = fkFuncionario 
						join departamento on idDepartamento = fkDepartamento
						where  nomeComponente = 'CPU'
						and statusFuncionario = 'ativo'
						and statusComputador = 'ativo'
						and nomeDepartamento = 'TI Financeira')
		from leitura 
		join computador on computador.idComputador = leitura.fkConfiguracao_Computador
		join configuracao on configuracao.fkComputador = computador.idComputador
		join componente on componente.idComponente = configuracao.fkComponente
		join funcionario on funcionario.idFuncionario = computador.fkFuncionario
		join departamento on departamento.idDepartamento = funcionario.fkDepartamento
		where nomeComponente = 'CPU'
		and MONTH(dataLeitura) = month('2022-11'  + '-04') 
		and YEAR(dataLeitura) = YEAR('2022-11' + '-04') 
		and statusFuncionario = 'ativo'
		and statusComputador = 'ativo'
		and nomeDepartamento = 'TI Financeira'
		group by idComponente, alertaCriticoUso
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	
	const dados = (await database.executar(instrucao));
	let qtdComponenteAVG = 0;
	let qtdComponenteTotal = dados.length;

	for(let i = 0; i < dados.length; i++) {
		var obj = dados[i];

		if(obj.mediaUso > obj.alertaCriticoUso){
			qtdComponentes++

		} 
	}

	var porcentagem = (qtdComponenteAVG/qtdComponenteTotal) * 100
	
	
	return porcentagem.toFixed(0)
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
	
	const dados = (await database.executar(instrucao));
	let qtdComponenteCPU = 0;
	let qtdComponenteHDD = 0;
	let qtdComponenteRAM = 0;
	let qtdTotalComponentes = 0;

	for(let i = 0; i < dados.length; i++) {
		var obj = dados[i];

		if(obj.mediaUso > obj.alertaCriticoUso && obj.nomeComponente == 'CPU'){
			qtdComponenteCPU++
			qtdTotalComponentes++
		}else if(obj.mediaUso > obj.alertaCriticoUso && obj.nomeComponente == 'RAM'){
			qtdComponenteRAM++
			qtdTotalComponentes++
		}else if(obj.mediaUso > obj.alertaCriticoUso && obj.nomeComponente == 'HDD'){
			qtdComponenteHDD++
			qtdTotalComponentes++
		}
	}

	var porcentagemHDD = (qtdComponenteHDD / qtdTotalComponentes) * 100
	var porcentagemRAM = (qtdComponenteRAM / qtdTotalComponentes) * 100
	var porcentagemCPU = (qtdComponenteCPU / qtdTotalComponentes) * 100

	return {porcentagemCpu: porcentagemCPU.toFixed(2),
		 porcentagemHdd: porcentagemHDD.toFixed(2),
		  porcentagemRam: porcentagemRAM.toFixed(2)}
}

module.exports = {
	getDadosComponentes,
	getLeituraComponente,
	getLeituraDepartamentosAVG,
	getTeste,
	getTestePIZZA
};
