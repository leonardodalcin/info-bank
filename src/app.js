const express = require('express');
const consign = require('consign');

const app = express();

consign({cwd: 'src'})
    .include('libs/middlewares.js')
    .then('services')
    .then('controllers')
    .then('routes')
    .into(app);

module.exports = app;