var database = require("../configDB/config");

function cadastrar(email, senha) {
	var instrucao = `
        INSERT INTO funcionario (email, senha) VALUES ('${email}', '${senha}');
    `;
	console.log("usuario inserindo");
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function entrar(email, senha) {
	var instrucao = `
        SELECT * FROM funcionario WHERE email = '${email}' AND senha = '${senha}';
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);

	return database.executar(instrucao);
}

function getNomeDepartamentosComFuncionarios() {
	var instrucao = `
	SELECT distinct nomeDepartamento FROM departamento
	join funcionario on idDepartamento = fkDepartamento;
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function getDadosFuncionarios() {
	var instrucao = `
	SELECT idFuncionario AS registro,nomeFuncionario,usuario,email,funcao, telefone,nomeDepartamento,
	idComputador FROM funcionario
	JOIN computador on idFuncionario = fkFuncionario
	JOIN departamento on idDepartamento = funcionario.fkDepartamento
	WHERE statusFuncionario = 'ativo'
	AND statusComputador = 'ativo'
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}


// estou fazendo isso / trazer dados que o icaro pediu, é quase igual ao de cima 
// com fkDepartamento a mais; 

function getDadosPerfilFuncionario() {
	var instrucao = `
	SELECT idFuncionario AS registro,nomeFuncionario,usuario,email,funcao, telefone,nomeDepartamento,
	idComputador FROM funcionario
	JOIN computador on idFuncionario = fkFuncionario
	JOIN departamento on idDepartamento = funcionario.fkDepartamento
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

module.exports = {
	entrar,
	cadastrar,
	getNomeDepartamentosComFuncionarios,
	getDadosFuncionarios,
	getDadosPerfilFuncionario
};
