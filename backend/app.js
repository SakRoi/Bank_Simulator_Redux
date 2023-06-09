const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
//const https = require("https");
const fs = require("fs");

const dotenv=require('dotenv');
dotenv.config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const accountsRouter = require('./routes/accounts');
const historyRouter = require('./routes/history');
const cardsRouter = require('./routes/cards');
const ownershipRouter = require('./routes/ownership');
const loginRouter = require('./routes/login');
const adminRouter = require('./routes/admin_login');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter); //works as our user authentication
app.use('/cerberus', adminRouter); //works as our admin authentication
app.use(authenticateToken);
app.use('/cards',cardsRouter);
app.use('/user', usersRouter);
app.use('/accounts',accountsRouter);
app.use('/history',historyRouter);
app.use('/ownership', ownershipRouter);

app.listen(process.env.port, function(){
    console.log("Application listens to port " + process.env.port);
});

//commented code is for HTTPS version
/*const options = {
	key: fs.readFileSync(process.env.privkey, 'utf8'),
	cert: fs.readFileSync(process.env.cert, 'utf8'),
	ca: fs.readFileSync(process.env.chain, 'utf8')
};

const httpsServer = https.createServer(options, app);

httpsServer.listen(3000, () => {
	console.log("Application listening to port " + process.env.port);
});*/


//Source: https://peatutor.com/express/Examples/webtoken.php
function authenticateToken(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    console.log("token = "+token);

    if (token == null) {
        return response.sendStatus(401);
    }
  
    jwt.verify(token, process.env.MY_TOKEN, (error, user) => {
        console.log(error);
  
        if (error){
            return response.sendStatus(403);
        }
        request.user = user;
        next();
    });
  }

module.exports = app;
