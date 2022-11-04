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

function getLeituraComponenteTR(idComponente) {
	var instrucao = `
        select top 1 idComponente,
        horaLeitura,
        uso as usoRT,
        temperatura as temperaturaRT
        from leitura join componente on idComponente = fkConfiguracao_Componente
        where dataLeitura = CAST( GETDATE() AS Date )
        and idComponente = ${idComponente}
        order by idLeitura desc
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function getLeituraComponenteAVG(idComponente, data) {
	var instrucao = `
        select nomeComponente,
        avg(uso) as avgUso,
        avg(temperatura) as avgTemperatura
        from leitura join componente on idComponente = fkConfiguracao_Componente
        where idComponente = ${idComponente}
        and dataLeitura = ${data}
        group by nomeComponente
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

module.exports = {
	getDadosComponentes,
	getLeituraComponenteTR,
	getLeituraComponenteAVG,
};
