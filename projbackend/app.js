//Express and Mongoose
require('dotenv').config();

const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth')


const mongoose = require('mongoose');

//Database connection is established
mongoose.connect(process.env.DATABASE,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log("DATABASE CONNECTED")
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
///api is added before all 
app.use("/api",authRoutes);

//Port for listening
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
    console.log(`WebApp is running... at ${port}`)
});


