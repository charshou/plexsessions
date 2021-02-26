const { request } = require("express");
const express = require("express");
const Confession = require("../models/confession")

const {check, validationResult} = require("express-validator")

const router = express.Router();

module.exports = () => {
    router.get("/", (req, res, next) => {
        try {
            res.render("layout", { template: "post" })
        } catch (err) {
            return next(err)
        }
    });

    router.post("/", [    
        check("message")
        .trim()
        .isLength({min : 1})
        .escape()
        .withMessage("There is no message.")
    ], (req, res) => {

        const error = validationResult(req);

        if (!error.isEmpty()) {
            req.session.feedback = {
                errors: errors.array()
            }
            return res.redirect("/post");
        }
        
        const confession = new Confession({
            message: req.body.message,
            status: false
        });
    
        confession.save()
            .catch((err) => {
                console.log(err)
            })
        return res.render("layout", { template: "post" });
    })

    return router;
}