create table products (
	item_id integer(10) auto_increment primary key,
	product_name varchar(255) not null,
	department_name varchar(255) not null,
	price integer(20) not null,
	stock_quantity integer(20)
);


