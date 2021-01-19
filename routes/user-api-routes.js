const { response } = require("express");
const db = require("../models");

module.exports = (app) => {
  app.get("/api/users", (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Message
    db.User.findAll({
      include: [db.Message],
    }).then((dbUser) => res.json(dbUser));
  });

  app.get("/api/users/:id", (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Message
    db.User.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Message],
    }).then((dbUser) => res.json(dbUser));
  });

  app.post("/api/users", (req, res) => {
    db.User.create(req.body).then((dbUser) => res.json(dbUser));
  });

  app.get("/api/messages", (req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Message.findAll({
      where: query,
      include: [db.User],
    }).then((dbMessage) => res.json(dbMessage));
  });
};
