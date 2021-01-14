// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const db = require("./models");

// Sets up the Express App
// =============================================================
//const app = express();
const PORT = process.env.PORT || 8080;

io.on('connection', (socket) => {
    socket.on('chat message', msg => {
      io.emit('chat message', msg);
    });
  });

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("Listening on port %s", PORT);
  });
});

// Sets up the Express app to handle data parsing
// app.use(app.urlencoded({ extended: true }));
// app.use(app.json());

// Static directory to be served
// app.use(app.static("app/public"));

// Routes
// =============================================================
// require("./routes/api-routes")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
