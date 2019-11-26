const express = require("express");
const users = require("./usersDb");
const router = express.Router();

router.get("/", (req, res) => {

    if (req.user) {
        res.send(req.user);
    } else {
        res.status(401).send({ error: "Not authenticated." });
    }

    return;
});

module.exports = router;
