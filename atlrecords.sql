create database if not exists atl_records;
use atl_records;
-- deleta as tabelas se elas existem (agr da pra selecionar tudo e rodar que vai dar certo)
drop table if exists recorde;
drop table if exists evento;
drop table if exists usuario;

create table usuario (
	id_usuario int auto_increment primary key not null,
    nome varchar(100),
    data_nascimento date,
    email varchar(100) unique not null,
    senha varchar(255),
    is_admin BOOLEAN not NULL DEFAULT false
);

#   ---------- rodar para adicionar o usuario admin ---------- 
insert into usuario (nome, email, data_nascimento, senha, is_admin) value('admin', 'admin@gmail.com', '2008-12-08', '$2y$10$lf7MELfFvSfrEJ7LiXRufOc9Y03XIKF1vaQJ.4tBH0QMwTw0ZcvrO', true);

CREATE TABLE recorde (
    id_recorde INT NOT NULL primary key AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    modalidade VARCHAR(30) NOT NULL,
    resultado DECIMAL(10,3) NOT NULL,
    data_recorde DATE NOT NULL,
    unidade VARCHAR(5) NOT NULL,
    
    foreign key (id_usuario) references usuario(id_usuario)
);

create table evento (
	id_evento int not null primary key auto_increment,
	nome varchar(100) not null,
    categoria enum('saltos', 'corridas', 'arremessos') not null,
    data date not null,
    descricao longtext
);