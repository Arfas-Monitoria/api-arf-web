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

function getDadosLeitura(dateInicio, dateFim, idComponente) {

    if (dateInicio == dateFim) {
        if (process.env.AMBIENTE_PROCESSO = 'local_MYSQL') {
            var instrucao = `
                select top 1 horaLeitura,
                media = (select avg(uso) from leitura)
                ,temperatura 
                from leitura
                join componente on idComponente = fkConfiguracao_Componente
                join computador on leitura.fkConfiguracao_Computador = computador.idComputador
                where dataLeitura between ${dateInicio} and ${dateFim}
                and idComponente = ${idComponente}
                order by dataLeitura desc
                `;
        } else {
            var instrucao = `select idLeitura, horaLeitura, uso, temperatura 
            from componente
            join leitura on fkConfiguracao_Componente = idComponente
            where dataLeitura between ${} and '2022-11-03'
            and idComponente = ${idComponente}
            order by idLeitura desc limit 1`;
        }

    } else {
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