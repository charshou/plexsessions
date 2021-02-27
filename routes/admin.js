const express = require("express");
const router = express.Router();
const Confession = require("../models/confession")

var adminAccess = false;

const users = [
    {name: "admin", pass: "admin"}
]

function checkLogin (name, pass) {
    for (var i = 0; i < users.length; i++) {
        user = users[i];
        if (user.uname == name && user.pass == pass) {
            return true;
        }
    }
    return false;
}

module.exports = () => {
    router.get("/", (req, res) => {
        try {
            if (adminAccess) {
                res.render("layout", {template: "admin-page"})
            } else {
                res.render("layout", { template: "admin-login" })
            }
        } catch (err) {
            return next(err)
        }
    })

    router.post("/", (req, res) => {
        console.log(req.body)
        adminAccess = checkLogin(req.body.name, req.body.pass);
        return res.redirect("/admin");
    })
    
    router.post("/login", (req, res) => {
        const entry = req.body;
        if (entry.buttonval == "Accept") {
            Confession.findById(entry.uid, (err, doc) => {
                doc.status = true;
                doc.save()
                .catch((err) => {
                    console.log(err)
                });
                return res.status(200).send();
            });
        } else if (entry.buttonval == "Reject") {
            Confession.findOneAndRemove({_id: entry.uid}, (err, doc) => {
                if (err) {
                    console.log(err);
                } 
                return res.status(200).send();
            });
        }
        return res.redirect("back");
    });

    return router;
};