const db = require("../models");

module.exports = (app) => {

  //POST route for saving new message to db
  app.post("/api/messages", (req, res) => {
    db.Message.create({
      body: req.body.message,
      UserId: req.body.UserId,

    }).then((dbMessage) => res.json(dbMessage));
  });


  // Albums.findAll({ include:
  //   [{ model: Artists }] })

  //GET route for reading all messages from the database and displaying them
  app.get("/", (req, res) => {
    db.Message.findAll({
      include: [{ model: db.User, as: 'User' }]
    }).then((dbMessage) => {
      // Construct a new message array from the username and body values of dbMessage
      // console.log(dbMessage[1].body + ": " + dbMessage[1].User.dataValues.name);
      let msgArray = [];
      for (i = 0; i < dbMessage.length; i++) {
        msgArray[i] = { username: dbMessage[i].User.dataValues.name, body: dbMessage[i].body };
      }

      // Now get just the users and make a users array
      db.User.findAll().then((dbUser) => {
        // Construct a new message array from the username and body values of dbMessage
        // console.log(dbUser[1]);
        let userArray = [];
        for (i = 0; i < dbUser.length; i++) {
          userArray[i] = { id: dbUser[i].dataValues.id, username: dbUser[i].dataValues.name };
        }

        // Now pass these array to index to be rendered
        res.render("index", { values: msgArray, users: userArray });

      });

    });
  });


  app.get('/api/:id?', (req, res) => {
    if (req.params.id) {
      // Display the JSON for ONLY that character.
      // (Note how we're using the ORM here to run our searches)

      db.Message.findAll({
        include: [{ model: db.User, as: 'User' }],
        where: { "UserId": req.params.id }
      }).then((dbMessage) => {
        // Construct a new message array from the username and body values of dbMessage
        // console.log(dbMessage[1].body + ": " + dbMessage[1].User.dataValues.name);
        // console.log(dbMessage);
        let msgArray = [];
        for (i = 0; i < dbMessage.length; i++) {
          msgArray[i] = { username: dbMessage[i].User.dataValues.name, body: dbMessage[i].body };
        }

        // Now get just the users and make a users array
        db.User.findAll().then((dbUser) => {
          // Construct a new message array from the username and body values of dbMessage
          // console.log(dbUser[1]);
          let userArray = [];
          for (i = 0; i < dbUser.length; i++) {
            userArray[i] = { id: dbUser[i].dataValues.id, username: dbUser[i].dataValues.name };
          }

          // Now pass these array to index to be rendered
          // console.log(msgArray);
          // console.log(userArray);

          // This render is causing an error that is displayed at the terminal
          // "Cannot set headers after they are sent to the client"
          // res.render("index", { values: msgArray, users: userArray });

          res.json(dbMessage);
        });

      });






    } else {
      Character.findAll().then((result) => res.json(result));
    }
  });


  //POST route for creating a new user
  app.post('/api/users', (req, res) => {
    db.User.create(req.body).then((dbUser) => res.json(dbUser));
  });
};
