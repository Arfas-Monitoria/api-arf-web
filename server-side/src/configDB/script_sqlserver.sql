drop table leitura;

drop table configuracao;

drop table componente;

drop table computador;

drop table funcionario;

drop table departamento;

create table departamento(
	idDepartamento int primary key identity(1, 1),
	nomeDepartamento varchar(45) unique not null
);

create table funcionario(
	idFuncionario int primary key identity(1, 1),
	fkDepartamento int not null,
	nomeFuncionario varchar(45) not null,
	usuario varchar(45) unique not null,
	email varchar(100) unique not null,
	senha varchar(45) not null,
	telefone char(11) unique not null,
	funcao varchar(45) not null,
	check(
		funcao in (
			'analista',
			'superintendente',
			'infra',
			'outros'
		)
	),
	statusFuncionario varchar(20) default 'ativo',
	check(
		statusFuncionario = 'ativo'
		or statusFuncionario = 'desligado'
	),
	profileImgPath varchar(100),
	acesso varchar(20) default 'negado',
	check(
		acesso = 'concedido'
		or acesso = 'negado'
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
	dtEntrega date not null default FORMAT(DATEADD(HOUR, -3, getdate()), 'yyyy-MM-dd'),
	dtDevolucao date,
	statusComputador varchar(45) default 'Disponível',
	check(
		statusComputador = 'Disponível'
		or statusComputador = 'Indisponível'
		or statusComputador = 'Em Manutenção'
	),
	FOREIGN KEY (fkFuncionario) REFERENCES funcionario (idFuncionario)
);

create table componente(
	idComponente int primary key identity(1, 1),
	fkComputador int not null,
	nomeComponente char(3) not null,
	capacidade varchar(45),
	check(
		nomeComponente = 'CPU'
		or nomeComponente = 'HDD'
		or nomeComponente = 'RAM'
	),
	foreign key (fkComputador) references computador(idComputador)
);

create table configuracao(
	idConfiguracao int primary key identity(1, 1),
	fkComputador int not null,
	fkComponente int unique not null,
	alertaCriticoUso int,
	alertaCriticoTemperatura int,
	foreign key (fkComputador) references computador(idComputador),
	foreign key (fkComponente) references componente(idComponente)
);

create table leitura(
	idLeitura int primary key identity(1, 1),
	fkConfiguracao_Computador int not null,
	fkConfiguracao_Componente int not null,
	dataLeitura date default FORMAT(DATEADD(HOUR, -3, getdate()), 'yyyy-MM-dd'),
	horaLeitura VARCHAR(8) not null default FORMAT(DATEADD(HOUR, -3, SYSDATETIME()), 'HH:mm:ss'),
	uso decimal(10, 6) not null,
	temperatura decimal(10, 6),
	foreign key (fkConfiguracao_Computador) references computador(idComputador),
	foreign key (fkConfiguracao_Componente) references componente(idComponente)
);

insert into
	departamento (nomeDepartamento)
values
	('TI Suporte'),
	('TI Infraestrutura'),
	('TI PJ'),
	('TI Serviços Bancários'),
	('TI Financeira'),
	('Telemarkenting');

insert into
	funcionario (
		fkDepartamento,
		nomeFuncionario,
		usuario,
		email,
		senha,
		telefone,
		funcao,
		acesso,
		profileImgPath
	)
values
	(
		4,
		'Luiz Paiva',
		'LUIPAIV',
		'super@gmail.com',
		'123',
		'11854125675',
		'superintendente',
		'concedido',
		null
	)
insert into
	funcionario (
		fkDepartamento,
		nomeFuncionario,
		usuario,
		email,
		senha,
		telefone,
		funcao,
		profileImgPath
	)
values
	(
		1,
		'josé Miguel',
		'JOAOMIG',
		'jose@gmail.com',
		'123',
		'11985632563',
		'analista',
		null
	),
	(
		1,
		'Carlos henrique',
		'CARLHEN',
		'carlos@gmail.com',
		'123',
		'11987456558',
		'analista',
		null
	),
	(
		2,
		'jonathan oliveira',
		'JONOLIV',
		'jonathan@gmail.com',
		'123',
		'11932564785',
		'infra',
		null
	),
	(
		2,
		'cintia da silva',
		'CINTSIL',
		'cintia@gmail.com',
		'123',
		'11032568956',
		'infra',
		null
	),
	(
		3,
		'Lucas Carlos',
		'LUCACAR',
		'locas@gmail.com',
		'123',
		'1185472104',
		'outros',
		null
	),
	(
		3,
		'Jessica de oliveira',
		'JESSOLI',
		'jessica@gmail.com',
		'123',
		'11856329856',
		'outros',
		null
	),
	(
		3,
		'mônica Fritz',
		'MONIFRI',
		'monica@gmail.com',
		'123',
		'11854124475',
		'outros',
		null
	),
	(
		1,
		'Luiz Reinaldo',
		'LUIZREI',
		'luiz@gmail.com',
		'123',
		'11325639857',
		'outros',
		null
	),
	(
		4,
		'João Max',
		'MAXJOAO',
		'infra@gmail.com',
		'123',
		'11325639887',
		'infra',
		null
	),
	(
		4,
		'Adriane Sanchez',
		'ADRSANC',
		'analista@gmail.com',
		'123',
		'11325677757',
		'analista',
		null
	),
	(
		5,
		'Leonardo Simão',
		'LEONSIM',
		'leonardo@gmail.com',
		'123',
		'11032566325',
		'outros',
		null
	),
	(
		5,
		'Jesse Nascimento',
		'JESSNAS',
		'jesse@gmail.com',
		'123',
		'11855554751',
		'outros',
		null
	),
	(
		6,
		'joao limeira',
		'JOAOLIM',
		'joao@gmail.com',
		'123',
		'11963258965',
		'outros',
		null
	),
	(
		6,
		'lisa monique',
		'LISAMON',
		'lisa@gmail.com',
		'123',
		'1174589632',
		'outros',
		null
	);

insert into
	computador (
		fkFuncionario,
		marca,
		modelo,
		idProduto,
		idDispositivo,
		hostname,
		statusComputador
	)
values
	(
		1,
		'Dell',
		'ASD-123',
		'32161651',
		'032656487',
		'DESKTOP-DS6541',
		'Disponível'
	),
	(
		2,
		'Dell',
		'ASD-123',
		'6325410',
		'0315487',
		'DESKTOP-FE0316',
		'Disponível'
	),
	(
		3,
		'Dell',
		'ASD-123',
		'32112651',
		'06459852',
		'DESKTOP-ER0251',
		'Disponível'
	),
	(
		4,
		'Dell',
		'ASD-123',
		'32165156',
		'03256418',
		'DESKTOP-DS0365',
		'Disponível'
	),
	(
		5,
		'Dell',
		'ASD-123',
		'65164981',
		'65236984',
		'DESKTOP-RE03',
		'Disponível'
	),
	(
		6,
		'Dell',
		'ASD-123',
		'31615690',
		'0321564',
		'DESKTOP-FER015',
		'Disponível'
	),
	(
		7,
		'Dell',
		'ASD-123',
		'36521458',
		'95135784',
		'DESKTOP-95135',
		'Disponível'
	),
	(
		8,
		'Dell',
		'ASD-123',
		'32659874',
		'156156161',
		'DESKTOP-TE036',
		'Disponível'
	),
	(
		9,
		'Dell',
		'ASD-123',
		'12365987',
		'032164898',
		'DESKTOP-RE0541',
		'Disponível'
	),
	(
		10,
		'Dell',
		'ASD-123',
		'0123654',
		'03269856',
		'DESKTOP-FEG01',
		'Disponível'
	),
	(
		11,
		'Dell',
		'ASD-123',
		'01254632',
		'15975369',
		'DESKTOP-12ERQ',
		'Disponível'
	),
	(
		12,
		'Dell',
		'ASD-123',
		'03154878',
		'032615487',
		'DESKTOP-QRE03',
		'Disponível'
	),
	(
		null,
		'HP',
		'ASD-105',
		'32163601',
		'032656117',
		'DESKTOP-DSFF121',
		'Indisponível'
	),
	(
		null,
		'HP',
		'ASD-020',
		'32161001',
		'032656158',
		'DESKTOP-625984',
		'Disponível'
	),
	(
		null,
		'HP',
		'ASD-336',
		'32161369',
		'032656157',
		'DESKTOP-DS4811',
		'Em Manutenção'
	),
	(
		null,
		'Dell',
		'ASD-998',
		'32161482',
		'056856117',
		'DESKTOP-TR0505',
		'Em Manutenção'
	);

insert into
	componente (nomeComponente, fkComputador, capacidade)
values
	('CPU', 1, 4.1),
	('RAM', 1, 8),
	('HDD', 1, 500),
	('HDD', 1, 500),
	('CPU', 2, 4.1),
	('RAM', 2, 8),
	('HDD', 2, 500),
	('HDD', 2, 500),
	('CPU', 3, 4.1),
	('RAM', 3, 8),
	('HDD', 3, 500),
	('CPU', 4, 4.1),
	('RAM', 4, 8),
	('HDD', 4, 500),
	('CPU', 5, 4.1),
	('RAM', 5, 8),
	('HDD', 5, 500),
	('CPU', 6, 4.1),
	('RAM', 6, 8),
	('HDD', 6, 500),
	('CPU', 7, 4.1),
	('RAM', 7, 8),
	('HDD', 7, 500),
	('CPU', 8, 4.1),
	('RAM', 8, 8),
	('HDD', 8, 500),
	('CPU', 9, 4.1),
	('RAM', 9, 8),
	('HDD', 9, 500),
	('CPU', 10, 4.1),
	('RAM', 10, 8),
	('HDD', 10, 500),
	('CPU', 11, 4.1),
	('RAM', 11, 8),
	('HDD', 11, 500),
	('CPU', 12, 4.1),
	('RAM', 12, 8),
	('HDD', 12, 500),
	('CPU', 13, 4.1),
	('RAM', 13, 8),
	('HDD', 13, 500),
	('HDD', 13, 500),
	('CPU', 14, 4.1),
	('RAM', 14, 8),
	('HDD', 14, 500),
	('HDD', 14, 500),
	('CPU', 15, 4.1),
	('RAM', 15, 8),
	('HDD', 15, 500),
	('HDD', 15, 500),
	('CPU', 16, 4.1),
	('RAM', 16, 8),
	('HDD', 16, 500),
	('HDD', 16, 500);

insert into
	configuracao (
		fkComputador,
		fkComponente,
		alertaCriticoTemperatura,
		alertaCriticoUso
	)
values
	(1, 1, 80, 90),
	(1, 2, null, 85),
	(1, 3, null, 70),
	(1, 4, null, 90),
	(2, 5, 60, 90),
	(2, 6, null, 90),
	(2, 7, null, 90),
	(2, 8, null, 90),
	(3, 9, 60, 65),
	(3, 10, null, 30),
	(3, 11, null, 75),
	(4, 12, 95, 85),
	(4, 13, null, 86),
	(4, 14, null, 65),
	(5, 15, 70, 85),
	(5, 16, null, 60),
	(5, 17, null, 85),
	(6, 18, 55, 65),
	(6, 19, null, 95),
	(6, 20, null, 30),
	(7, 21, 35, 45),
	(7, 22, null, 85),
	(7, 23, null, 30),
	(8, 24, 85, 85),
	(8, 25, null, 45),
	(8, 26, null, 85),
	(9, 27, 65, 86),
	(9, 28, null, 70),
	(9, 29, null, 72),
	(10, 30, 78, 65),
	(10, 31, null, 65),
	(10, 32, null, 85),
	(11, 33, 72, 95),
	(11, 34, null, 80),
	(11, 35, null, 75),
	(12, 36, 46, 77),
	(12, 37, null, 45),
	(12, 38, null, 86),
	(13, 39, 45, 55),
	(13, 40, null, 35),
	(13, 41, null, 65),
	(13, 42, null, 47),
	(14, 43, 20, 58),
	(14, 44, null, 85),
	(14, 45, null, 23),
	(14, 46, null, 80),
	(15, 47, 36, 85),
	(15, 48, null, 86),
	(15, 49, null, 59),
	(15, 50, null, 84),
	(16, 51, 55, 60),
	(16, 52, null, 85),
	(16, 53, null, 50),
	(16, 54, null, 30);