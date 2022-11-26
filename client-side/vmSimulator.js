const { setIntervalAsync, clearIntervalAsync } = require("set-interval-async");

var database = require("../server-side/src/configDB/config");
process.env.AMBIENTE_PROCESSO = "local_SQL_SERVER";
process.env.AMBIENTE_PROCESSO = "producao";

let min = 0;
let max = 100;

let DaysSubtractor = 0;
let dadosGerados = 0;

const pastDays = 90;
const qtdDadosAGerar = 3;
let interval;

gerarDados();

async function gerarDados() {
  interval = setIntervalAsync(async () => {
    await gerarDadosComponentes(0);

    const startingDay = pastDays - DaysSubtractor;

    if (startingDay != 0) {
      if (startingDay % 30 == 0 && pastDays != 90) {
        min += 20;
      }

      await gerarDadosComponentes(startingDay);
      dadosGerados++;

      if (dadosGerados == qtdDadosAGerar) {
        DaysSubtractor++;
        dadosGerados = 0;
      }
    }
  }, 1000);
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
