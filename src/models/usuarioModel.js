var database = require("../database/config")



/*


ACIMA DAQUI NÃO SERA USADO APENAS ESTOU USANDO COMO BASE

ABAIXO SERA DO PROJETO ARFAS


*/ 

function cadastrar(email, senha) {
   
    var instrucao = `
        INSERT INTO usuario (email, senha) VALUES ('${email}', '${senha}');
    `;
    console.log("usuario inserindo")
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

module.exports = {
    entrar,
    cadastrar 
};