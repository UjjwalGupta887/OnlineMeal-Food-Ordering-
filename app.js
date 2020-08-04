const express = require("express");
const app = express();
const port = 80;
const path = require("path");
// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mealform', { useNewUrlParser: true, useUnifiedTopology: true });


// first url and second folder name or fhir uski sari file execute hogi.
app.use("/static", express.static("static"))
app.use(express.urlencoded())
app.set('view engine', 'pug'); //set the template engine as pug
app.set("views", path.join(__dirname, "views"));//set the view directory

const mealSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    about: String,
});

const Contact = mongoose.model('Contact', mealSchema);

app.get("/", function (req, res) {
    res.status(200).render("index.pug")
})

app.post("/", function (req, res) {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("Your form is submitted successfully..")
    }).catch(() => {
        res.status(404).send("Item is not saved to the database ..")
    })

    // res.status(200).render("contact.pug")
})
// start server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})
