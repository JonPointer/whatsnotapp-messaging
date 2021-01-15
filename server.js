const express = require("express");
const exphbs = require("express-handlebars");
const db = require("./models");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("app/public"));

require("./routes/api-routes")(app);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.use(express.static(path.join(__dirname, "/")));
app.set("view engine", "handlebars");

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});
