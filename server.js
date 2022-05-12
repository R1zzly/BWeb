const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const config = require('./config/db.config');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(config.mongoURI).then(() => console.log("Database connected successfully"))
    .catch((err) => console.log(err));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine','ejs');

app.use("/", require("./routes/root.js"));
app.use("/about", require("./routes/about.js"));
app.use("/shop", require("./routes/shop.js"));
app.use("/blog", require("./routes/blog.js"));
app.use("/product", require("./routes/product.js"));

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);