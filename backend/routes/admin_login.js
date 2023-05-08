const express = require('express');
const router = express.Router();
const jtw = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const admin = require("../models/admin_login_model");

//Original source: https://peatutor.com/express/Examples/webtoken.php, refactored by Saku Roininen
router.post('/',

function(request, response) {
    if(!(request.body.username && request.body.password)){
        console.log("username or password missing");
        response.send(false);
    } else if(request.body.username === "root" && request.body.password === "root"){

    /*this is the default root username and password. 
    When they first log in to the admin control panel, they are asked to 
    either remove the "root" account or change it's password for safety purposes.*/

        admin.checkRoot(function(dbError, dbResult){
            if(dbError || !(dbResult.length > 0)){
                console.log("Default Account does not exist");
                response.send(false);
            } else {
                console.log("Success");
                user = request.body.username;
                const token = generateAccessToken({ cardID: user, role: 2802 });
                response.send(token);
            }
        });
    } else {
        const user = request.body.username;
        const pass = request.body.password;

        admin.checkPassword(user, function(dbError, dbResult){
            if(dbError){
                response.json(dbError);
            } else if (!(dbResult.length > 0)){
                console.log("user does not exist");
                response.send(false);
            } else {
                bcrypt.compare(pass,dbResult[0].password, function(error,compareResult) {
                    if(!compareResult) {
                        console.log("wrong password");
                        response.send(false);
                    } else {
                    console.log("success");
                    const token = generateAccessToken({ cardID: user, role: 2802 });
                    response.send(token);
                    }
                });
            }
        });
    }
});

function generateAccessToken(info) {
    dotenv.config();
    return jtw.sign(info, process.env.MY_TOKEN, { expiresIn: '200s'});
}

module.exports = router;
