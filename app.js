var express = require('express')
var path = require('path')
var BackEndServer = require('./server/BackEndServer/router')
var FrontEndServer = require('./server/FrontEndServer/router')
var bodyParser = require('body-parser');

var app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
})

app.use('/sqlpage/',express.static(path.join(__dirname,'./sqlpage/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.use("/BackEndServer",BackEndServer)
app.use("/FrontEndServer",FrontEndServer)

app.listen(4000, function () {
    console.log('server is running 4000...........');
})

