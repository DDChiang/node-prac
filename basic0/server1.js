//init
var express = require('express');
var app = express();
var fs = require("fs");
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var multer = require("multer");

//gain access to static files
app.use(express.static('public'));
app.use(express.static('stylesheet'));
//Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false})
app.use(multer({ dest: '/tmp/'}));

app.use(cookieParser())

//path and what to do for path request
app.get('/', function (req, res) {
	res.send("Hello Yo!");
	console.log("Cookies: ", req.cookies)
});

app.get('/index.html', function(req, res) {
	res.sendFile(__dirname + '/' + 'index.html');
});

//first form used '/process_get' as pathname in "action"
app.get('/process_get', function (req, res) {

	//Prepare output in JSON format
	response = {
		first_name: req.query.first_name,
	last_name: req.query.last_name
}

	console.log(JSON.stringify(response));
});

//post form
app.post('/process_post', urlencodedParser, function (req, res) {

	//prep output in JSON format 
	response = {
		first_name: req.body.first_name,
		last_name: req.body.last_name
	}

	console.log("post" + response);

	res.end(JSON.stringify(response));

})

//post: upload files
app.post('/file_upload', function (req, res) {
	console.log(req.files.file.name);
	console.log(req.files.file.path);
	console.log(req.files.file.type);

	var file = __dirname + "/" + req.files.file.name;

	fs.readFile(req.files.file.path, function (err, data) {

		fs.writeFile(file, data, function (err) {
			if (err) {
				console.log(err);
			}
			else {
				response = {
					message : 'File uploaded successfully', filename: req.files.file.name };
			}

				console.log(response);
		res.end(JSON.stringify(response));
		})
	});

});

//cookie
app.get('/', function (req, res) {
	console.log("Cookies: ", req.cookies)
})




//upload




	//instantiate server
	var server = app.listen(8081, function() {
		var host = server.address().address
		var port = server.address().port

		console.log("Example app listening at http://%s:%s", host, port);
});