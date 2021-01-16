const { response } = require("express");
const db = require("../models");

module.exports = (app) => {
  //POST route for saving new message to db
  app.post("/api/messages", (req, res) => {
    db.Message.create({
      username: req.body.username,
      body: req.body.message,
    }).then((dbMessage) => res.json(dbMessage));
  });

  //GET route for reading all messages from the database and displaying them
  app.get("/", (req, res) => {
    db.Message.findAll({}).then((dbMessage) => {
      // Construct a new array from the username and body values of dbMessage
      let passArray = [];
      for (i = 0; i < dbMessage.length; i++) {
        passArray[i] = {
          username: dbMessage[i].username,
          body: dbMessage[i].body,
        };
      }
      // Now pass this array to index to be rendered
      res.render("index", { values: passArray });
    });
  });

  app.get("/api/messages/:username", (req, res) => {
    if (req.params.username) {
      Message.findAll({
        where: {
          username: req.params.username,
        },
      }).then((dbMessage) => {
        // Construct a new array from the username and body values of dbMessage
        let passArray = [];
        for (i = 0; i < dbMessage.length; i++) {
          passArray[i] = {
            username: dbMessage[i].username,
            body: dbMessage[i].body,
          };
        }
        // Now pass this array to index to be rendered
        res.render("index", { values: passArray });
      });
    }
  });
};
