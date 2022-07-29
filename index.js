const express = require("express");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");

const { clientRouter } = require("./routes/client");
const { homeRouter } = require("./routes/home");
const { handleError } = require("./utils/error");

const app = express();

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

app.use("/", homeRouter);
app.use("/client", clientRouter);

app.use(handleError);

app.listen(3000, "localhost", () => {
  console.log("Express server listening on port 3000 - http://localhost:3000");
});
