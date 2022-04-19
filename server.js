const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
const port = 3000

app.use(express.static('public'));
app.use('/img', express.static('public'));
app.use('/', express.static('public'));

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + "/contact.html")
})

app.post('/', (req, res) => {
    const city = req.body.cName;
    const apiKey = "51ad03058768ccc6e10ce5814a136f74";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey +"&units=" + unit +""

    https.get(url, function (response){
        console.log(response.statusCode);

        response.on("data", function (data){
            const wData = JSON.parse(data);
            const temp1 = wData.main.temp;
            const wDescription = wData.weather[0].description;
            const icon = wData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h3>The weather is " + wDescription + "</h3>");
            res.write("<h1>The temperature in " + city + " is " + temp1 + " degrees Celcius </h1>");
            res.write("<img src=" + imageURL + ">");

            res.send();
        })
    })
})

app.use("/", require("./public/main.js"));
app.use("/shop", require("./public/shop.js"));
app.use("/about", require("./public/about.js"));
app.use("/blog", require("./public/blog.js"));
app.use("/sproduct", require("./public/sproduct.js"));
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);