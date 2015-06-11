var express = require('express');   //use express
var app = express();    //make express() methods available through "app" var

/*PATHS*/
//definte paths/routes through diff http: request methods
app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
   res.send('Hello World');
})

//post rpovides block of data usu to data-handling process i.e. submit a form. annotation of existing resources
app.post('/', function(req, res) {
    console.log("Got a POSt resquest for the homeapge");
    res.send("Hello Post");
});

//response to DELETE request for /del_user page
app.delete('/del_user', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello World');
})


app.get('/list_user', function (req, res) {
    console.log("Got a Get resquest for the 'list user' page");
    res.send("Hello User");
});

//get request for abcd, any combination of anything sandwiched btw ab ****anything*** cd
app.get('/ab*cd', function(req, res) {
    console.log("Got a Get resquest for a combinatino of ab + anythign sandwiched + cd");
    res.send("Pattern Match");
});

//create and designate server using "express's" and "node's" listen method
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);

})

//post, get, put, delete = create/update, read, create, and delete resource (CRUD)

/*Access to static files*/
app.use(express.static('public'));