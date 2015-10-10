var express = require('express');
var app = express();
var http = require('http').Server(app);
var mongojs = require('mongojs');
var db = mongojs('contactList',['contactList']);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);


//app.get('/', function(req,res){
//	res.send('Hello World');
//});

app.use(express.static(__dirname +'/public'));
app.use(bodyParser.json());


io.on('connection', function(socket){
	console.log("new user connected");
});
		

app.get('/contactlist',function(req,response){
	console.log('I received a get request');

	db.contactList.find(function(err,docs){
		console.log(docs);
		response.json(docs);
	});

});

app.post('/contactlist',function(reqst,resp){
	console.log(reqst.body);

	db.contactList.insert(reqst.body, function(err, doc){
		resp.json(doc);
		io.sockets.emit('new');
	});
});

app.delete('/contactlist/:id',function(reqst,resp){
	var id = reqst.params.id;
	console.log('Received a delete request for : '+id);

	db.contactList.remove({_id : mongojs.ObjectId(id)}, function(err, doc){
		resp.json(doc);
		io.sockets.emit('del');
	});
});

http.listen("4000", function(){
	console.log("Server is running on port 4000 .....");
});



