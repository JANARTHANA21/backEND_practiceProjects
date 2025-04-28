const express=require('express');
const { login, board } = require("../controllers/controller");
const authemthication = require('../middlewares/auth');
const Routers=require('express').Router();
Routers.route('/login').post(login);
Routers.route('/board').get(authemthication,board);
module.exports=Routers;
