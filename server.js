"Use strict";

const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const myRouter = require('./Routes/routes');
const woeid = require('woeid');

const app = express();
const port = 3006;

const pages = {
  index: "index.html"
};

app.use(logger('combined'));
//app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: false }));
app.use(cookieParser());

//views
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use("/js/", express.static(__dirname + '/js'));

//routes
app.get('/', (req , res) => {
  res.render('index');
});
app.use('/boxes', myRouter);


var newYork = woeid.getWoeid('Nyc')
console.log(newYork);

app.listen( port, () => console.log(`The application has started and is running on port: ${port}`));