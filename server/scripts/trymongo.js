const { MongoClient } = require('mongodb');

//const url = 'mongodb://localhost:27017'; 
const url = 'mongodb://localhost:27017'; 
const dbName = 'waitlistDB';
const collectionName = 'waitlist';





//Create a database, connect directly to create a database
function createDB(){
	let connectUrl = url + "/" + dbName;
	MongoClient.connect(connectUrl,function (err,db){
		if(err){
			console.log(err);
			return;
		}else{
			console.log("database created!");
			db.close();
		}
	});
}


//Create a data collection
function createMgCollection(){
	let connectUrl = url + "/" + dbName;
	MongoClient.connect(connectUrl,(err,db)=>{
		if(err){
			console.log(err);
			return;
		}else{
			console.log("connect success");
			let dbo = db.db(dbName);
			dbo.createCollection(collectionName,(err,res)=>{
				if(err){
					console.log(err);
					return;
				}else{
					console.log("connect collection success");
					//console.log(res);
					db.close();
				}
			});
		}
	});
}

//Add 
function insertDataToMg(){
	let connectUrl = url + "/" + dbName;
	MongoClient.connect(connectUrl,(err,db)=>{
		if(err){
			console.log(err);
			return;
		}else{
			console.log("connect success");
			const dbo = db.db(dbName);
			var data= [ {id: 1, name: "Tom" ,number:"15547856932",created:new Date()},
			           {id: 2, name: "Sandy" ,number:"13527809873",created:new Date()} ];
		    dbo.collection(collectionName).insertMany(data, function(err, res) {
			if (err){
				console.log(err);
			}else{
				console.log("insert collection success");
				//console.log(res);
				db.close();
			}
		  });
		}
	});
}

//Updata
function updateDataToMg(){
	let connectUrl = url + "/" + dbName;
	MongoClient.connect(connectUrl,(err,db)=>{
		if(err){
			console.log(err);
			return;
		}else{
			console.log("connect success");
			const dbo = db.db(dbName);
			
			let myquery = { name: "Tom" };
			let newvalues = { $set: {name: "Andy", number: "14785693214" } };

		    dbo.collection(collectionName).updateOne(myquery, newvalues, function(err, res) {
			if (err){
				console.log(err);
			}else{
				console.log("update collection success");
				db.close();
			}
		  });
		}
	});
}


//display
function queryDataFromMg(){
	let connectUrl = url + "/" + dbName;
	MongoClient.connect(connectUrl, function(err, db) {
		if(err){
			console.log(err);
			return;
		}else{
			console.log("connect success");
			const dbo = db.db(dbName);
			
			var query = {};
			dbo.collection(collectionName).find(query).toArray(function(err, result) {
				if(err){
					console.log(err);
					return;
				}else{
					console.log("query success");
					console.log(result);
					db.close();
				}			
			});
		}
	});
}

//delete
function deleteDataFromMg(){
	let connectUrl = url + "/" + dbName;
	MongoClient.connect(connectUrl, function(err, db) {
		if(err){
			console.log(err);
			return;
		}else{
			console.log("connect success");
			const dbo = db.db(dbName);
			
			var query = {id: 1};
			dbo.collection(collectionName).deleteOne(query,function(err, obj) {
				if(err){
					console.log(err);
					return;
				}else{
					console.log("delete success");
					//console.log(obj);
					db.close();
				}			
			});
		}
	});
}


//createCounterDB
function createCounterDB(){
	let connectUrl = url + "/counters" ;
	MongoClient.connect(connectUrl,function (err,db){
		if(err){
			console.log(err);
			return;
		}else{
			console.log("database created!");
			db.close();
		}
	});
}

function insertCounterToMg(){
	let connectUrl = url + "/counters" ;
	MongoClient.connect(connectUrl,(err,db)=>{
		if(err){
			console.log(err);
			return;
		}else{
			console.log("connect success");
			const dbo = db.db(dbName);
			var data= { _id: "wait", current:0,created:new Date()};
		    dbo.collection("counters").insertOne(data, function(err, res) {
			if (err){
				console.log(err);
			}else{
				console.log("insert collection success");
				//console.log(res);
				db.close();
			}
		  });
		}
	});
}

//createCounterDB();
//insertCounterToMg();


var reqStr = process.argv.splice(2)[0]

if(reqStr == "createDB"){
	createDB();
}else if(reqStr == "createMgCollection"){
	createMgCollection();
}else if(reqStr == "insertDataToMg"){
	insertDataToMg();
}else if(reqStr == "updateDataToMg"){
	updateDataToMg();
}else if(reqStr == "queryDataFromMg"){
	queryDataFromMg();
}else if(reqStr == "deleteDataFromMg"){
	deleteDataFromMg();
}else if(reqStr == "createCounterDB"){
	createCounterDB();
}else if(reqStr == "insertCounterToMg"){
	insertCounterToMg();
}else{
	console.log("allowed params only like :     \n");
	console.log("createDB\n");
	console.log("createMgCollection\n");
	console.log("insertDataToMg\n");
	console.log("updateDataToMg\n");
	console.log("queryDataFromMg\n");
	console.log("deleteDataFromMg\n");
	console.log("createCounterDB\n");
	console.log("insertCounterToMg\n");
}