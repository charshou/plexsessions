const express = require("express");
const router = express.Router();

const postRoute = require("./post");
const adminRoute = require("./admin");

module.exports = () => {
    router.get("/", (req, res) => {
        res.render("layout", { template: "index" });
    })

    router.use("/post", postRoute());
    router.use("/admin", adminRoute());

    return router
};