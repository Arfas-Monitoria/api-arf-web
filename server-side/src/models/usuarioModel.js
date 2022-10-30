var database = require("../configDB/config");

function cadastrar(email, senha) {
	var instrucao = `
        INSERT INTO usuario (email, senha) VALUES ('${email}', '${senha}');
    `;
	console.log("usuario inserindo");
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function entrar(email, senha) {
	var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);

	return database.executar(instrucao);
}

function getAllDepartamentos() {
    var instrucao = `
    SELECT nomeDepartamento FROM departamento;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosUsuarios() {
    var instrucao = `
    select configuracao.fkComponente, componente.nomeComponente, funcionario.nomeFuncionario, departamento.nomeDepartamento, computador.idComputador from configuracao 
join computador on computador.idComputador = configuracao.fkComputador
join funcionario on funcionario.idFuncionario = computador.fkFuncionario
join departamento on departamento.idDepartamento = funcionario.fkDepartamento
join componente on componente.idComponente = configuracao.fkComponente
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
	entrar,
	cadastrar,
	getAllDepartamentos,
	getDadosUsuarios
};
