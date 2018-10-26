const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

const server = express()

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

consign().include('./app/routes')
	.then('./app/controllers')
	.then('./services/').into(server)

module.exports = server
