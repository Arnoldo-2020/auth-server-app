const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./db/config')

//Create the server
const app = express();

//Database
dbConnection();

//Public directory
app.use(express.static('public'));

//CORS
app.use(cors());

//Lecture and parse of the body
app.use(express.json());

//Routes
app.use( '/api/auth', require('./routes/auth') );

app.listen( process.env.PORT, () => {
    console.log(`Server runing in port: ${ process.env.PORT }`);
})