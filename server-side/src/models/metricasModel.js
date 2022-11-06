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

module.exports = {
	getDadosComponentes,
	getLeituraComponente,
	getLeituraDepartamentosAVG,
};
