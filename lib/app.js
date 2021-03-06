const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./util/error-handler');
const ensureAuth = require('./auth/ensure-auth')();
require('./models/register-plugins');

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.json());

const auth = require('./routes/auth');
const items = require('./routes/items');

app.use('/api/auth', auth);
app.use('/api/items', ensureAuth, items);

app.use((req, res) => {
    res.sendFile('index.html', { root: './public' });
});

app.use(errorHandler());

module.exports = app;