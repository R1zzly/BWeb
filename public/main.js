const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const https = require('https');
router
    .route("/")
    .get((req, res) => res.sendfile("public/main.html"))
    .post((req, res) =>  res.send("POST"));
module.exports = router;