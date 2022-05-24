const express = require('express')
const bodyParser = require('body-parser')


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-Zhandos:Qwerty12345@cluster0.6mwif.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('MongoDB connected');
    }
})

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const app = express()

const getUserList = require('./user').getUserList;
const findUserById = require('./user').findUserById;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
// import { getUserList ,findUserById } from "./user";
const userList = getUserList();

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
app.use("/", require("./routes/auth.js"));
app.use("/", require("./routes/login.js"));


app.get("/users", (req, res) => {
    return res.status(200).send({
        success: "true",
        message: "users",
        users: userList,
    });
});
app.post("/addUser", (req, res) => {

    if (!req.body.name) {
        return res.status(400).send({
            success: "false",
            message: "name is required",
        });
    } else if (!req.body.companies) {
        return res.status(400).send({
            success: "false",
            message: "companies is required",
        });
    }
    const user = {
        id: userList.length + 1,
        isPublic: req.body.isPublic,
        name:  req.body.name,
        companies: req.body.companies,
        books:  req.body.books
    };
    userList.push(user);
    return res.status(201).send({
        success: "true",
        message: "user added successfully",
        user,
    });
});
app.put("/user/:userId", (req, res) => {
    console.log(req.params)
    const id = parseInt(req.params.userId, 10);
    const userFound=findUserById(id)


    if (!userFound) {
        return res.status(404).send({
            success: 'false',
            message: 'user not found',
        });
    }

    const updatedUser= {
        id: id,
        isPublic: req.body.isPublic || userFound.body.isPublic,
        name:req.body.name || userFound.body.name,
        companies: req.body.companies || userFound.body.companies,
        books: req.body.books || userFound.body.books

    };

    if (!updatedUser.name) {
        return res.status(400).send({
            success: "false",
            message: "name is required",
        });
    } else if (!updatedUser.companies) {
        return res.status(400).send({
            success: "false",
            message: "companies is required",
        });
    }

    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === id) {
            userList[i] = updatedUser;
            return res.status(201).send({
                success: 'true',
                message: 'user updated successfully',
                updatedUser

            });
        }
    }
    return  res.status(404).send({
        success: 'true',
        message: 'error in update'

    });
})
app.delete("/user/:userId", (req, res) => {
    console.log(req.params)
    const id = parseInt(req.params.userId, 10);
    console.log(id)
    for(let i = 0; i < userList.length; i++){
        if(userList[i].id === id){
            userList.splice(i,1);
            return res.status(201).send({
                success: 'true',
                message: 'user deleted successfully'
            });
        }
    }
    return res.status(404).send({
        success: 'true',
        message: 'error in delete'
    });
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);