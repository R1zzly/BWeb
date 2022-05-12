const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')

const app = express()
app.set("view engine",'ejs')
app.use(bodyParser.urlencoded({extended: true}))
const port = 3000
const regRoute = require('./routes/auth');
app.use('/', regRoute);
const logRoute = require('./routes/login');
app.use('/', logRoute);

app.use(express.static('public'));
app.use('/img', express.static('public'));
app.use('/', express.static('public'));

app.use("/", require("./public/main.js"));
app.use("/shop", require("./public/shop.js"));
app.use("/about", require("./public/about.js"));
app.use("/blog", require("./public/blog.js"));
app.use("/sproduct", require("./public/sproduct.js"));
app.use("/contact", require("./public/contact.js"));
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);