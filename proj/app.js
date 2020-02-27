var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Web3 = require('web3');

web3 = new Web3("http://localhost:8545");
var contractAddress = "0x0Afe4db08E7D15704905a7Dda57a4D31ffe7A5b9";

var contractABI=[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_roll",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_indian",
				"type": "bool"
			},
			{
				"internalType": "enum StudentManagementSystem.gender",
				"name": "_myGender",
				"type": "uint8"
			}
		],
		"name": "setStudent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_roll",
				"type": "uint256"
			}
		],
		"name": "getStudent",
		"outputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_indian",
				"type": "bool"
			},
			{
				"internalType": "enum StudentManagementSystem.gender",
				"name": "_myGender",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
SMS = new web3.eth.Contract(contractABI,contractAddress);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var setStudentRouter = require('./routes/setStudent');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/setStudent',setStudentRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
