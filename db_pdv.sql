create database pdv;

create table usuarios(
  id serial primary key,
  nome text not null,
  email text unique,
  senha text not null
);

create table categorias(
  id serial primary key,
  descricao text
);


insert into categorias (descricao) 
values ('Informática'), ('Celulares'), ('Beleza e Perfumaria'),
('Mercado'), ('Livros e Papelaria'), ('Brinquedos'), ('Moda'),
('Bebê'), ('Games')
;


create table tokens (
    id serial primary key,
    usuario_id 	integer references usuarios(id) on delete cascade,
    token text not null
);

create table clientes(
  id serial primary key,
  nome text not null,
  email text unique,
  cpf char(11) unique not null
  
);


