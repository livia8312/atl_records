create database atl_records;
use atl_records;

create table usuario (
	id_usuario int auto_increment primary key not null,
    nome varchar(100),
    data_nascimento date,
    email varchar(100) unique not null,
    senha varchar(255)
);
CREATE TABLE recorde (
    id_recorde INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    modalidade VARCHAR(30) NOT NULL,
    resultado DECIMAL(10,3) NOT NULL,
    data_recorde DATE NOT NULL,
    unidade VARCHAR(5) NOT NULL,

    PRIMARY KEY (id_recorde),
    INDEX (id_usuario)
);
SELECT * FROM recorde;