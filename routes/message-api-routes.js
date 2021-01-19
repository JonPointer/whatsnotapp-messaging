const { response } = require("express");
const db = require("../models");

module.exports = (app) => {
  app.get('/api/messages', (req, res) => {
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

  // Get route for retrieving a single post
  app.get("/api/messages/:id", (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Message.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.User],
    }).then((dbMessage) => res.json(dbMessage));
  });

  // POST route for saving a new message
  app.post("/api/messages", (req, res) => {
    db.Message.create(req.body).then((dbMessage) => res.json(dbMessage));
  });

  // //GET route for reading all messages from the database and displaying them
  app.get("/", (req, res) => {
    db.Message.findAll({}).then((dbMessage) => {
      // Construct a new array from the username and body values of dbMessage
      let passArray = [];
      for (i = 0; i < dbMessage.length; i++) {
        passArray[i] = {
          username: dbMessage[i].userName,
          body: dbMessage[i].body,
        };
      }
      // Now pass this array to index to be rendered
      res.render("index", { values: passArray });
    });
  });
};
