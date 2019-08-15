const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

module.exports = app => {
    app.use('/fonts',express.static((path.join(__dirname, '../../','/node_modules/bootstrap/dist/fonts'))));
    app.use('/css',express.static((path.join(__dirname, '../','/resources/assets/css'))));
    app.use('/css', express.static(path.join(__dirname, '../../','/node_modules/bootstrap/dist/css')));
    app.use('/js',express.static((path.join(__dirname, '../','/resources/assets/js'))));
    app.use('/js', express.static(path.join(__dirname, '../../','/node_modules/bootstrap/dist/js')));
    app.use('/js', express.static(path.join(__dirname, '../../','/node_modules/jquery/dist')));    

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
}