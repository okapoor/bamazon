var mysql = require("mysql");

var connection = mysql.createConnection({
  host     : "bamazondb.cugepa9seetj.us-west-1.rds.amazonaws.com",
  port:"3306",
  user     : 'okapoor',
  password : 'ucibootcamp',
  database : 'bamazondev'
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("We are connected!!")
});

// var query = "create table products (item_id integer(10) auto_increment primary key,product_name varchar(255) not null,department_name varchar(255) not null,price integer(20) not null,stock_quantity integer(20));"


var query = "insert into products (product_name, department_name, price, stock_quantity) value ('iPhone 7S', 'Electronics', 500, 10), ('MacBook Pro 13Inch', 'Electronics', 1300, 40), ('Jameson', 'Alcohol', 35, 300), ('Blue Label', 'Alcohol', 199, 1000), ('Toni and Guy Hair Gel', 'Beauty', 30, 5), ('American Crew Wax', 'Beauty', 30, 20), ('Harry Potter and the sorcerers stone', 'Books',15, 10), ('Harry Dresden: Summer tale', 'Books', 30, 10), ('FountainHead by Ayn Rand', 'Books',10, 5 )";

connection.query(query, function(err, result, fields) {
	if (err) throw err;
	console.log(result.length);
	connection.end();
});


