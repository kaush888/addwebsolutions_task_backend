require('dotenv').config() 
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const constants  = require('./config/constants');
const routes = require('./routes');
// const cron = require('./cron/index')

// Server Config
const hostname = constants.HOST_NAME;
const port = constants.PORT;
const app = express();
const server = http.createServer(app);

// cors
app.use(cors());

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Include Route
routes(app);
// app.use(routes);

// creates a listener on the specified port or path
server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});