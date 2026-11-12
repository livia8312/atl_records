create database atl_records;
use atl_records;

create table usuario (
	id_usuario int auto_increment primary key not null,
    nome varchar(100),
    data_nascimento date,
    email varchar(100) unique not null,
    senha varchar(255)
);