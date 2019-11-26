const express = require("express");
const users = require("../routes/usersDb");

function auth(req, res, next) {
  if (!req.headers.token) {
    res.status(401).send({ error: "Not authentificated" });
    return;
  }

  const user = users.find(user => {
    return user.token === req.headers.token;
  });

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ error: "Not authentificated." });
  }

  return;
}

module.exports = auth;
