drop table leitura;

drop table configuracao;

drop table componente;

drop table computador;

drop table funcionario;

drop table departamento;

create table departamento(
	idDepartamento int primary key identity(1, 1),
	nomeDepartamento varchar(45) unique not null,
);

create table funcionario(
	idFuncionario int primary key identity(1, 1),
	nomeFuncionario varchar(45) not null,
	usuario varchar(45) unique not null,
	email varchar(100) unique not null,
	telefone char(11) unique not null,
	funcao varchar(45) not null,
	senha varchar(45) not null,
	statusFuncionario varchar(7) default 'ativo',
	fkDepartamento int not null,
	check(
		statusFuncionario = 'ativo'
		or statusFuncionario = 'inativo'
	),
	profileImgPath varchar(100),
	acessoDashboard char(3) default 'sim',
	check(
		acessoDashboard = 'sim'
		or acessoDashboard = 'nao'
	),
	foreign key (fkDepartamento) references departamento (idDepartamento)
);

create table computador(
	idComputador int primary key identity(1, 1),
	fkFuncionario int,
	marca varchar(45) not null,
	modelo varchar(45) not null,
	idProduto varchar(100) unique not null,
	idDispositivo varchar(100) unique not null,
	hostname varchar(100) not null,
	dtEntrega date not null default CAST(GETDATE() AS Date),
	dtDevolucao date,
	statusComputador varchar(45),
	check(
		statusComputador = 'ativo'
		or statusComputador = 'inativo'
	),
	FOREIGN KEY (fkFuncionario) REFERENCES funcionario (idFuncionario)
);

create table componente(
	idComponente int primary key identity(1, 1),
	nomeComponente char(3) not null,
	capacidade int,
	check(
		nomeComponente = 'CPU'
		or nomeComponente = 'HDD'
		or nomeComponente = 'RAM'
	)
);

create table configuracao(
	idConfiguracao int primary key identity(1, 1),
	fkComputador int not null,
	fkComponente int unique not null,
	alertaCriticoUso int,
	alertaCriticoTemperatura int,
	foreign key (fkComputador) references computador(idComputador),
	foreign key (fkComponente) references componente(idComponente),
);

create table leitura(
	idLeitura int primary key identity(1, 1),
	fkConfiguracao_Computador int not null,
	fkConfiguracao_Componente int not null,
	dataLeitura date default CAST(GETDATE() AS Date),
	horaLeitura VARCHAR(8) not null default CONVERT(VARCHAR(8), GETDATE(), 108),
	uso decimal(10, 6) not null,
	temperatura decimal(10, 6),
	foreign key (fkConfiguracao_Computador) references computador(idComputador),
	foreign key (fkConfiguracao_Componente) references componente(idComponente),
);