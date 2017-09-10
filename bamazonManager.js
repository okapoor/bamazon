var mysql = require("./node_modules/mysql");
var inquirer = require("./node_modules/inquirer");

var connection = mysql.createConnection({
	host     : "bamazondb.cugepa9seetj.us-west-1.rds.amazonaws.com",
	port:"3306",
	user     : 'okapoor',
	password : 'ucibootcamp',
	database : 'bamazondev'
});

var questions = {
	type: "list",
	name: "actions",
	message: "Please select admin task : ",
	choices: [
	"View Products for Sale",
	"View Low Inventory", 
	"Add to Inventory",
	"Add New Product"],
};

var startPrompt = () => {
	inquirer.prompt(questions).then((answers) => {
		switch(answers.actions) {
			case "View Products for Sale":
			viewProducts();
			break;
			case "View Low Inventory":
			viewLowInventory();
			break;
			case "Add to Inventory":
			addToInventory();
			break;
			case "Add New Product":
			addNewStuff();
			break;
		}
	})
};

connection.connect((err) => {
	if (err) throw err;
});


var viewProducts = function() {
	var query = "select item_id, product_name, price, stock_quantity from products";
	connection.query(query, (err, result, fields) => {
		result.forEach((elem) => {
			console.log(elem.item_id + "\t" + elem.product_name + "\t" + elem.price + "\t" + elem.stock_quantity+"\t");
		})
		console.log("=============================");
		startPrompt();
		console.log(" ");
		console.log("=============================");
	})
};

var viewLowInventory = function() {
	var query = "select item_id, product_name, price, stock_quantity from products where stock_quantity<5";
	connection.query(query, (err, result, fields) => {
		if (result.length) {
		result.forEach((elem) => {
			console.log(elem.item_id + "\t" + elem.product_name + "\t" + elem.price + "\t" + elem.stock_quantity+"\t");
		});
	} else {
		console.log(" ")
		console.log("There are no items with low inventory at the moment!")
		console.log(" ")
	}

		console.log("=============================");
		startPrompt();
		console.log(" ");
		console.log("=============================");
	})
};

var addStuffQuestion = [{
	type: "input",
	name: "id",
	message: "ID of product to add : ",
	
},{
	type: "input",
	name: "quantity",
	message: "New Quantity of product : ",
}];

var addToInventory = function() {
	inquirer.prompt(addStuffQuestion).then(function(answers) {
		var item_id = answers.id;
		var stock_quantity = answers.quantity;

		var query = "update products set ? where ?"
		console.log(query + " " + item_id + " " + stock_quantity);
		connection.query(query,[{stock_quantity: stock_quantity},{item_id: item_id}], (err, result, fields) => {
			if (err) throw err;
			console.log("Successfully updated quantity");
			console.log("=============================");
			startPrompt();
			console.log(" ");
			console.log("=============================");
		});
	})
}

var addNewStuffQuestion = [
{
	type: "input",
	name: "name",
	message: "Name of product to add : ",
},{
	type: "input",
	name: "quantity",
	message: "Quantity of product to add : ",
},{
	type: "input",
	name: "department",
	message: "Department of product to add : ",
},{
	type: "input",
	name: "price",
	message: "Price of product to add : ",
}];


var addNewStuff = function() {
	inquirer.prompt(addNewStuffQuestion).then( (answer) => {

		var query = "insert into products (product_name, department_name, price, stock_quantity) value (?,?, ?,?)";
		connection.query(query, [answer.name, answer.department, answer.price, answer.quantity], (err, result, fields) => {
			if (err) throw err;
			console.log("Successfully Updated products");
			console.log("=============================");
			startPrompt();
			console.log(" ");
			console.log("=============================");
		})
	});
}


startPrompt();