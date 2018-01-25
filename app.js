var express = require("express");
var app = express();

app.listen(10788);
app.use(express.static(__dirname + '/build/'));
