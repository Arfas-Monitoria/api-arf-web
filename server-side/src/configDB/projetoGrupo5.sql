
create database projetoGrupo5;
use projetoGrupo5;

create table departamento(
idDepartamento int primary key auto_increment,
nomeDepartamento varchar(45)
);

create table funcionario(
idFuncionario int primary key auto_increment,
nomeFuncionario varchar(45),
usuario varchar(45),
email varchar(100),
telefone char(11),
funcao varchar(45),
senha varchar(45),
permissaoDashboard char(3) check(PermissaoDashboard = 'sim' or PermissaoDashboard = 'nao'),
statusFuncionario char(7) check(statusFuncionario = 'ativo' or statusFuncionario = 'inativo'),
fkDepartamento int, foreign key (fkDepartamento) references departamento (idDepartamento)
);

create table computador(
idComputador int primary key auto_increment,
patrimonio varchar(45),
marca varchar(45),
modelo varchar(45),
mec varchar(45),
processador varchar(45),
anoFabricacao date,
idProduto varchar(45),
idDispositivo varchar(45),
nomeDispositivo varchar(45),
dtEntrega date,
dtDevolucao date,
fkFuncionario int,
	FOREIGN KEY (fkFuncionario) REFERENCES funcionario (idFuncionario)
);

create table componentes(
idComponente int primary key,
nomeComponente varchar(45),
unidadeMedida varchar(45)
);

create table alerta_porcentagem(
idAlerta_Porcentagem int primary key auto_increment,
porcentagem int
);

create table configuracao(
idConfiguracao int primary key auto_increment,
fkComponente int, foreign key (fkComponente) references componentes(idComponente),
fkComputador int, foreign key (fkComputador) references computador(idComputador),
capacidade int,
fkAlerta_porcentagem int, foreign key (fkAlerta_porcentagem) references alerta_porcentagem(idAlerta_Porcentagem)
);

create table leitura(
idLeitura int primary key auto_increment,
fkConfiguracao_fkComponentes int, foreign key (fkConfiguracao_fkComponentes) references componentes(idComponente),
fkConfiguracao_fkComputador int, foreign key (fkConfiguracao_fkComputador) references computador(idComputador),
fkConfiguracao_fkAlerta_Porcentagem int, foreign key (fkConfiguracao_fkAlerta_Porcentagem) references alerta_porcentagem(idAlerta_Porcentagem),
uso decimal(10,2),
dataLeitura datetime
);








