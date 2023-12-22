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

create table produtos (
  id serial primary key,
  descricao text not null,
  quantidade_estoque integer,
  valor integer not null,
  categoria_id integer references categorias(id) on delete cascade
);

create table clientes (
  id serial primary key,
  nome text not null,
  email text unique,
  cpf varchar(14),
  cep varchar(9),
  rua text,
  numero integer,
  bairro text,
  cidade text,
  estado text
);

create table pedidos (
  id serial primary key,
  cliente_id integer references clientes(id),
  observacao text,
  valor_total integer not null
);

create table pedido_produtos (
	id serial primary key,
  pedido_id integer references pedidos(id),
  produto_id integer references produtos(id),
  quantidade_produto integer,
  valor_produto integer
);


alter table produtos
add produto_imagem text;
