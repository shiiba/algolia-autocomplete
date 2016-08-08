// Was getting XMLHttpRequest Cross Origin errors, so setting up a tmp server

// Requirements
const express = require('express');
const app = express();
const logger = require('morgan');

// Middleware
app.use(logger('dev'));
app.use(webPackMiddleware);
app.use(express.static('public'));

// Listen
const port = process.env.PORT || 3000;
app.listen(port);
console.log('==============');
console.log('listening on port ' + port);
console.log('==============');
