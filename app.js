const express = require ('express');
const { json } = require('body-parser');
const { urlencoded } = require('express');
const sendSms = require('./routes/sendSms');
const morgan = require('morgan');

const app = express();

app.use(json());
app.use(urlencoded({extended:true}));
app.use(morgan('tiny'))

app.use(sendSms);

module.exports = app;
