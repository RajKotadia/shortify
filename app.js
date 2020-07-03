const express = require('express');
const hbs = require('hbs');
const path = require('path');

const { port } = require('./config/config');

// to connect to db
require('./db/dbConnection');

// the routes
const url = require('./routes/url');

// initialize the app
const app = express();

// add middleware
app.use(express.static('public'));
app.use('/', url);

// set up view engine and its config
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.listen(port, () => console.log(`Server listening on port ${port}`));
