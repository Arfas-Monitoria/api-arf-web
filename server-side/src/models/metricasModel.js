var database = require("../configDB/config");

function getDadosComponentes(idComputador) {
    var instrucao = `
	SELECT idComponente,nomeComponente,capacidade,alertaCriticoUso,alertaCriticoTemperatura
	FROM leitura 
	JOIN componente ON idComponente = leitura.fkConfiguracao_Componente
	JOIN configuracao ON idComponente = configuracao.fkComponente
    JOIN computador ON idComponente = fkComputador
    WHERE idComputador = ${idComputador}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosLeitura(idComputador, dateInicio, dateFim, idComponente) {

    if(dateInicio == dateFim){
        var instrucao = `
        select top 1 horaLeitura,
        media = (select avg(uso) from leitura)
        ,temperatura 
        from leitura
        join componente on idComponente = fkConfiguracao_Componente
        join computador on leitura.fkConfiguracao_Computador = computador.idComputador
        join configuracao on configuracao.fkComputador = computador.idComputador
        where idComputador = 1
        and dataLeitura between ${dateInicio} and ${dateFim}
        and idComputador = ${idComputador} 
        and idComponente = ${idComponente}
        order by dataLeitura desc
        `;
    }else{
        var instrucao = `
        select top 1 idComponente,nomeComponente, horaLeitura,uso,temperatura 
        from leitura
        join componente on idComponente = fkConfiguracao_Componente
        join computador on leitura.fkConfiguracao_Computador = computador.idComputador
        join configuracao on configuracao.fkComputador = computador.idComputador
        where idComputador = 1
        and dataLeitura between ${dateInicio} and ${dateFim}
        and idComputador = ${idComputador}  
        and idComponente = ${idComponente}
        order by dataLeitura desc
        `;
        
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
	getDadosComponentes,
    getDadosLeitura
};