var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/dashboard', function(req, res) {
    console.log("GET From SERVER");
    //connect to server
    res.send(ingredients);
});

app.get('/bundle', function(req, res) {
    console.log("GET From SERVER");
    //connect to server
    res.send(bundle);
});

app.post('/upload', function(req, res) {
    console.log(req.body);
    //connect to server
    //upload file
    res.status(200).send("Successfully posted commisions");
});

app.patch('/commisions/:uid', function(req, res) {
    var ingredient = req.body;
    const { uid } = req.params;
    console.log(req.body);
    //connect to server
    res.status(200).send(`Successfully patched commision ${id}`);
});


app.listen(6069);