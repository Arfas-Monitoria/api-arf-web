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

function putProfileImgId(imgId, idFuncionario) {
	var instrucao = `
				UPDATE funcionario SET profileImgPath = '${imgId}' WHERE idFuncionario = ${idFuncionario} 
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

module.exports = {
	entrar,
	cadastrar,
	getNomeDepartamentosComFuncionarios,
	getDadosFuncionarios,
	putProfileImgId
};
