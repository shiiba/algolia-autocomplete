var webpack = require ('webpack'); 
var config = require ('./webpack.config.js');
var webpackMiddleware = require('webpack-dev-middleware');
var compiler = webpack(config);

module.exports = webpackMiddleware(compiler);
