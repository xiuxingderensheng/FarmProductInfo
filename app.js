var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mongoStore = require('connect-mongo')(session);
var serveStatic = require('serve-static');

var port = process.env.PORT || 3030;
var app = express();
var dbUrl = 'mongodb://localhost/ncp_info';

mongoose.connect(dbUrl);

//设置模板查找目录
app.set('views', './app/views/pages');
//设置默认的模板引擎
app.set('view engine', 'jade');

//解析表单数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

//app.use(express.multipart());

app.use(session({
	secret: 'user',
 	resave: false,
   	saveUninitialized: true,
 	store: new mongoStore({
 		url: dbUrl,
 		collection: 'sessions'
 	})
}));

var env = process.env.NODE_ENV || 'development';
if ('development' === env) {
	//显示错误信息
	app.set('showStackError', true);
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug', true);
}

require('./routes/routes')(app);
//格式化时间
//app.locals.moment = require('moment');
//静态资源地址，如css、js等
app.use(serveStatic(path.join(__dirname, 'public')));
//app.listen(port);

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
require('./app/controllers/websocket')(io);

server.listen(port, function() {
	console.log('ncp_info0 listening on port ' + port);
});