create database projetoGrupo5;
use projetoGrupo5;

create table usuario(
idUsuario int primary key auto_increment,
email varchar(45),
senha varchar(100)
);

select * from usuario;

insert into usuario(email,senha) values ('vini.vini@gmail.com' , '123123');







