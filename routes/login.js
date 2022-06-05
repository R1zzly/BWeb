const express = require('express');
const session = require("express-session");
const router = express.Router();
const USER = require('../models/USER');
const bcrypt = require('bcrypt');

router.get("/", async (req, res) => {
    res.render('login', {
        ErrorsArr: [],
    })
});

router.post("/", async(req, res) => {
    let errors = [];
    const email = req.body.email;
    const password = req.body.password;
    const exUser = await USER.findOne({ email: req.body.email }).exec();
    console.log(exUser)
    console.log(exUser.password)
    if (!exUser) {
        errors.push({ msg: "no user exists" });
        return res.render("login", {
            ErrorsArr: errors,
        })
    }

    bcrypt.compare(password, exUser.password, (err, isMatch) => {
        if (err) {
            console.log(err)
        }
        if (isMatch) {
            return res.redirect('/')
        } else {
            return res.redirect('/register')
        }
    })
})

module.exports = router







// const express = require("express");
// const router = express.Router();
// const userController = require("../controllers/userController");
//
// router.get('/', (req, res) => res.render('login'));
// router.post('/', userController.login);
//
// module.exports = router;