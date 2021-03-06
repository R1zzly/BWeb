const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const router = express.Router();
const USER = require("../models/USER");
const bcrypt = require('bcrypt');

var passwordValidator = require('password-validator');
var Passschema = new passwordValidator();

Passschema
    .is().min(8) // Minimum length 8
    .is().max(100) // Maximum length 100
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters
    .has().digits(2) // Must have at least 2 digits

router.get("/", (req, res) => {
    res.render('signup', {
        ErrorsArr: [],
    })
})
router.post("/", async(req, res) => {
    const { name, email, city, password } = req.body;


    const exUser = await USER.findOne({ email: email });
    let errors = [];
    console.log(exUser);
    if (exUser) {
        errors.push({ msg: "user Already exists" });
        return res.render("signup", {
            ErrorsArr: errors
        })
    }
    if (!name || !email || !password) {
        errors.push({ msg: "please fulfill all forms" });
        return res.render("signup", {
            ErrorsArr: errors
        })
    }
    if (Passschema.validate(password) === false) {
        errors.push({ msg: "not valid pass" });
        return res.render("signup", {
            ErrorsArr: errors
        })
    }
    console.log(errors)
    if (errors.length !== 0) {
        return
    } else {
        const newUser = new USER({
            name: name,
            email: email,
            password: password,
            City: city,
            Date: Date.now(),
            Role: "User",
        })

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err){
                    throw err;
                }
                else{

                    newUser.password = hash;

                    newUser.save((err)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            res.redirect('/login');
                            console.log('Success');
                        }
                    })
                }
            });
        });

    }
})


module.exports = router;