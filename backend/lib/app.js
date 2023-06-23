const express = require('express');
const { config } = require('dotenv');
const { consultRoutes } = require('./consult/routes');
const { carRoutes } = require('./car/routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
consultRoutes(app);
carRoutes(app);
config();

module.exports = app;
