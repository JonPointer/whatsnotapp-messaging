const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const exphbs = require("express-handlebars");
const db = require("./models");
const path = require("path");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("app/public"));

require("./routes/api-routes")(app);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.use(express.static(path.join(__dirname, "/")));
app.set("view engine", "handlebars");

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

db.sequelize.sync().then(() => {
  http.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});
