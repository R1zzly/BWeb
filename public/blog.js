const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.sendfile("public/about.html"))
    .post((req, res) => res.send("POST"));
module.exports = router;