require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const router = require('./routes/user');

db.database();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.listen(process.env.PORT, () => {
    console.log(`server is up at port ${process.env.PORT}`);
});
