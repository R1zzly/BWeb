const express = require("express");
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/img', express.static('public'));
app.use('/', express.static('public'));

app.use("/", require("./public/main.js"));
app.use("/shop", require("./public/shop.js"));
app.use("/sproduct", require("./public/sproduct.js"));
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);