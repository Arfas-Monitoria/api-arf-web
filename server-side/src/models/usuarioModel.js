var database = require("../configDB/config");

function cadastrar(nome, usuario,email, telefone, funcao, departamento, senha) {
	var instrucao = `
        INSERT INTO funcionario (nomeFuncionario, usuario, email, telefone, funcao, fkDepartamento, senha) 
		VALUES ('${nome}','${usuario}','${email}','${telefone}','${funcao}', '${departamento}','${senha}');
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
	SELECT * FROM funcionario
	JOIN computador on idFuncionario = fkFuncionario
	JOIN departamento on idDepartamento = funcionario.fkDepartamento
	WHERE statusFuncionario = 'ativo'
	AND statusComputador = 'ativo'
	ORDER BY idComputador
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function getDepartamentos() {
	var instrucao = `
	SELECT * FROM departamento`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}


// estou fazendo isso / trazer dados que o icaro pediu, é quase igual ao de cima 
// com fkDepartamento a mais; 

function getDadosPerfilFuncionario() {
	var instrucao = `
	SELECT * FROM funcionario
	JOIN computador on idFuncionario = fkFuncionario
	JOIN departamento on idDepartamento = funcionario.fkDepartamento
	WHERE statusFuncionario = 'ativo'
	AND statusComputador = 'ativo'
	ORDER BY idComputador
    `;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

module.exports = {
	entrar,
	cadastrar,
	getNomeDepartamentosComFuncionarios,
	getDadosFuncionarios,
	putProfileImgId,
	getDepartamentos,
	getDadosPerfilFuncionario
};
