const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
//const { check, validationResult } = require('express-validator/check');
const expressValidator = require('express-validator')

const server = express()

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

server.use(expressValidator())
// server.use(check)
// server.use(validationResult)

consign().include('./app/routes')
	.then('./app/controllers')
	.then('./services/').into(server)

module.exports = server
