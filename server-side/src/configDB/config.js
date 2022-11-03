var sql = require("mssql/msnodesqlv8");
var mysql = require("mysql2");

// CONEXÃO DO MYSQL - Desenvolvimento (Local)
var mySqlConfig = {
  host: "localhost",
  user: "aluno",
  database: "arfasMonitoriaDB",
  password: "sptech",
  multipleStatements: true,
};

// CONEXÃO DO SQL SERVER - Desenvolvimento (Local)
var sqlServerConfigLocal = {
	database: "PROJETO",
	server: "DESKTOP-O0RBP7T\\SQLEXPRESS",
	driver: "msnodesqlv8",
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000,
	},
	options: {
		trustedConnection: true,
	},
	multipleStatements: true,
};

// CONEXÃO DO SQL SERVER - PRODUÇÂO (Azure)
var sqlServerConfigAzure = {
	user: "arfasmonitoria",
	password: "#Gfgrupo5",
	database: "arfasMonitoriaDB",
	server: "arfas-monitoria-db.database.windows.net",
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000,
	},
	options: {
		encrypt: true, // for azure
	},
	multipleStatements: true,
};

function executar(instrucao) {
	if (process.env.AMBIENTE_PROCESSO == "producao") {
		return new Promise(function (resolve, reject) {
			sql
				.connect(sqlServerConfigAzure)
				.then(function () {
					return sql.query(instrucao);
				})
				.then(function (resultados) {
					console.log("resultados: ", resultados);
					resolve(resultados.recordset);
				})
				.catch(function (erro) {
					reject(erro);
					console.log("ERRO: ", erro);
				});
			sql.on("error", function (erro) {
				return "ERRO NO SQL SERVER (Azure): ", erro;
			});
		});
	} else if (process.env.AMBIENTE_PROCESSO == "local_SQL_SERVER") {
		return new Promise(function (resolve, reject) {
			sql
				.connect(sqlServerConfigLocal)
				.then(function () {
					return sql.query(instrucao);
				})
				.then(function (resultados) {
					console.log("resultados: ", resultados);
					resolve(resultados.recordset);
				})
				.catch(function (erro) {
					reject(erro);
					console.log("ERRO: ", erro);
				});
			sql.on("error", function (erro) {
				return "ERRO NO SQL SERVER (Local): ", erro;
			});
		});
	} else if (process.env.AMBIENTE_PROCESSO == 'local_MYSQL') {
		return new Promise(function (resolve, reject) {
			var conexao = mysql.createConnection(mySqlConfig);
			conexao.connect();
			conexao.query(instrucao, function (erro, resultados) {
			  conexao.end();
			  if (erro) {
				reject(erro);
			  }
			  console.log(resultados);
			  resolve(resultados);
			});
			conexao.on("error", function (erro) {
			  return "ERRO NO MySQL WORKBENCH (Local): ", erro.sqlMessage;
			});
		  });
	} else {
		return new Promise(function (resolve, reject) {
			console.log(
				"\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n",
			);
			reject("AMBIENTE NÃO CONFIGURADO EM app.js");
		});
	}
}

module.exports = {
	executar,
};
