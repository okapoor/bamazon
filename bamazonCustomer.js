var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
	host     : "bamazondb.cugepa9seetj.us-west-1.rds.amazonaws.com",
	port:"3306",
	user     : 'okapoor',
	password : 'ucibootcamp',
	database : 'bamazondev'
});

var itemId = 0;
var quantity = 0;

connection.connect(function(err) {
	if (err) throw err;
});

var showProducts = function() {
	//create connection
	
	//assign query to run
	var showAllQuery = "select * from products";
	//run query!
	connection.query(showAllQuery, function(err, result, fields){
		if (err) {
			console.log(err);
			return;
		}

		result.forEach(function(elem) {
			console.log(elem.item_id + "\t" + elem.product_name + "\t" + elem.department_name + "\t" + elem.price + "\t" + elem.stock_quantity+"\t");
		})

		inquirer.prompt(buyQuestion).then(function(answers){
			itemId =  answers.itemId;
			quantity = answers.quantity;
			console.log(answers);
			checkBuy(itemId, quantity);
		});
	});
};




var buyQuestion = [
{
	type: 'input',
	name: "itemId",
	message: "Please input ID of item you wish to purchase: "

},
{
	type: 'input',
	name: "quantity",
	message: "Please input quantity of item you wish to purchase: "

}];

var checkBuy = function(itemID, quantity) {
	var checkQuery = "select stock_quantity,price from products where item_id="+itemID;
	console.log(checkQuery);
	connection.query(checkQuery,itemId, function(err, result, fields){
		if (err) {
			console.log(err);
			return;
		}
		var stock_quantity = result[0].stock_quantity
		var itemPrice = result[0].price;
		console.log("DB Result is : " + stock_quantity + "    " + quantity );

		if(stock_quantity > quantity) {
			console.log("We have enough to sell");
			var remaining_stock = stock_quantity - quantity;
			var update_quantity_query = "update products set ? where ?";

			connection.query(update_quantity_query,[{
				stock_quantity: remaining_stock
			},{
				item_id: itemID
			}], function(err, result, fields) {
				if (err) throw err;
				console.log("Order successfully placed. Your total is : " + itemPrice);
				showProducts();

			} )
		}else {
			console.log("We are out!");
			showProducts();
		}
	});
};



showProducts();



