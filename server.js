const express = require("express");
const mongoose = require("mongoose")
const path = require("path");
const bodyParser = require("body-parser");
const config = require("./config");

const routes = require("./routes/index")

const Confession = require("./models/confession")

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"))

const dburi = config.key;
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT || port, () => {
        console.log(`Listening on port ${port}.`)
    }))
    .catch((err) => console.log(err))

app.use(async (req, res, next) => {
    try {
        const confessions = await Confession.find().sort({ createdAt: -1 });
        res.locals.confessions = confessions;
        return next()
    } catch (err) {
        return next()
    }
})

app.use(bodyParser.urlencoded({extended: true}));

app.use("/", routes());

app.get("/add-confession", (req, res) => {
    const confession = new Confession({
        message: "this is a confession that i have which is very new",
        status: false
    });

    confession.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})