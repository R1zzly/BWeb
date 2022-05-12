const express = require('express');
const session = require("express-session");
const router = express.Router();
const USER = require('../models/USER');

router.get("/login", (req, res) => {
    res.render('login', {
        ErrorsArr: [],
    })
});

router.post("/login", async(req, res) => {
    let errors = [];
    const email = req.body.email;
    const password = req.body.password;
    const exUser = await USER.findOne({ email: email });
    console.log(exUser)
    console.log(exUser.password)
    if (!exUser) {
        errors.push({ msg: "no user exists" });
        return res.render("login", {
            ErrorsArr: errors,
        })
    }

    if (password !== exUser.password) {
        errors.push({ msg: "password not correct" });
        return res.render("login", {
            ErrorsArr: errors,
        })
    }

    return res.redirect('/')


})

module.exports = router