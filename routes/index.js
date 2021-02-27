const express = require("express");
const router = express.Router();

const postRoute = require("./post");
const adminRoute = require("./admin");

module.exports = () => {
    router.get("/", (req, res) => {
        res.render("layout", { template: "index" }); 
    })

    //API

    router.get("/api", (req, res) => {
        res.send(res.locals.confessions.filter((entry) => {
            return entry.status;
        }));
    })

    router.get("/api/admin", (req, res) => {
        res.send(res.locals.confessions.filter((entry) => {
            return !entry.status
        }));
    })

    router.use("/post", postRoute());
    router.use("/admin", adminRoute());

    return router
};