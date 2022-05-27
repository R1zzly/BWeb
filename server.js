require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const ejs = require('ejs');
const config = require('./config/db.config');
const swaggerUi = require('swagger-ui-express')


const swaggerDocument = require('./swagger.json')
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

mongoose.connect(config.mongoURI).then(() => console.log("Database connected successfully"))
    .catch((err) => console.log(err));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine','ejs');


app.use("/", require("./routes/root"));
app.use("/about", require("./routes/about"));
app.use("/shop", require("./routes/shop"));
app.use("/blog", require("./routes/blog"));
app.use("/product", require("./routes/product"));
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);