const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

//Envs stored in file 
require('dotenv').config();

//Start express
const app = express();

//Run server on port 5000
const port = process.env.PORT || 5000;

//Server to use plugins
app.use(cors());
app.use(express.json());

//mongodb token
const uri = process.env.ATLAS_URI

//connect to db using token
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

//open database
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to MongoDB");
})

//--------------------------------------------------------

const profileRouter = require('./routes/profile');

app.use('/profile', profileRouter);

//--------------------------------------------------------

//Start listening on port 5000
app.listen(port, () => {
    console.log(`Using port ${port}`)
})