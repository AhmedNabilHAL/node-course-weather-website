const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000;
// Define paths
const viewsPath = path.join(__dirname, "../templates/views");
const publicDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handle bars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather app",
        name: "Ahmed Nabil"
    });
})
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Ahmed Nabil"
    });
})

app.get("/help", (req, res) => {
    res.render("help", {
        helpfulMsg: "Helpful message here",
        title: "Help",
        name: "Ahmed Nabil"
    })
})
app.get("/weather", (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    const address = req.query.address;
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
        
        
        forecast(latitude, longitude,  (error, forecastData) => {
            if (error) return res.send({
                error
            })

            res.send({
                location,
                forecastData
            });
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
        
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        error: "Help article not found.",
        name: "Ahmed Nabil"
    })
});
app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        error: "Page not found.", 
        name: "Ahmed Nabil"
    })
});
app.listen(PORT, () => {
    console.log("Server is up on port " + PORT);
});