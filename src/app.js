const express = require('express');
const consign = require('consign');

const app = express();

consign({cwd: 'src'})
    .include('libs/middlewares.js')
    .then('libs/database.js')
    .then('services')
    .then('models')
    .then('repositories')
    .then('controllers')
    .then('routes')
    .into(app);

module.exports = app;