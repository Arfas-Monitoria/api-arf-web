const { setIntervalAsync, clearIntervalAsync } = require("set-interval-async");

var database = require("../server-side/src/configDB/config");
process.env.AMBIENTE_PROCESSO = "local_SQL_SERVER";
process.env.AMBIENTE_PROCESSO = "producao";

let min = 0;
let max = 80;

let DaysSubtractor = 0;
let dadosGerados = 0;

const diaDeHoje = new Date().getDate();

const pastDays = 90 + diaDeHoje;
const qtdDadosAGerar = 3;
let interval;

gerarDados();

async function gerarDados() {
  interval = setIntervalAsync(async () => {
    let startingDay = pastDays - DaysSubtractor;

    console.log('Gerando dados para hoje')
    await gerarDadosComponentes(0, 0, 100);

    console.log('Gerando dados desse mês')
    await gerarDadosComponentes(diaDeHoje - DaysSubtractor, 0, 100);

    if (startingDay > diaDeHoje) {
      if (startingDay % 30 == 0 && startingDay != pastDays) {
        if (max < 100) {
          console.log('+20 to max')
          console.log('+20 to min')
          min += 20
          max += 20
        } else {
          min += 40
          console.log('+40 to max')
        }
      }

      console.log(min)
      console.log(max)
      console.log(startingDay)

      await gerarDadosComponentes(startingDay, min, max);
      dadosGerados++;

      if (dadosGerados == qtdDadosAGerar) {
        DaysSubtractor++;
        dadosGerados = 0;
      }
    }
  }, 1000);
}

async function gerarDadosComponentes(startDay, min, max) {
  var instrucao = `
    select idComputador, idComponente, nomeComponente
    from funcionario
    join computador on idFuncionario = fkFuncionario
    join configuracao on idComputador = fkComputador
    join componente on idComponente = fkComponente
    where statusFuncionario = 'ativo' and
    idFuncionario <= 15 order by idFuncionario desc;
  `;

  lista = await database.executar(instrucao).then((resultado) => {
    return resultado;
  });

  await lista.map(async (obj) => {
    const tempValue = obj.nomeComponente == "CPU" ? gerarRandomValue(min, max) : null;

    var insert = `
	  insert into leitura
	  (fkConfiguracao_Computador, fkConfiguracao_Componente, dataLeitura, uso, temperatura) values
	  (
	    ${obj.idComputador},
	    ${obj.idComponente},
	    '${getDataHoje(startDay)}',
	    ${gerarRandomValue(min, max)},
	    ${tempValue}
	  )
	  `;

    // console.log("Executando a instrução SQL: \n" + insert);
    await database.executar(insert);
  });
}

function gerarRandomValue(minParam, maxParam) {
  return Math.ceil(Math.random() * (maxParam - minParam) + minParam);
}

function getDataHoje(startDay = 0) {
  var date = new Date();
  var last = new Date(date.getTime() - startDay * 24 * 60 * 60 * 1000);
  var dd = last.getDate();
  var mm = last.getMonth() + 1;
  var yyyy = last.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
}
