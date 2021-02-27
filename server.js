const express = require("express");
const mongoose = require("mongoose")
const path = require("path");
const bodyParser = require("body-parser");

const routes = require("./routes/index")

const Confession = require("./models/confession")

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"))

const dburi = "mongodb+srv://charlie:test123@nodetuts.zbhsp.mongodb.net/node-tuts?retryWrites=true&w=majority"
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(port, () => {
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