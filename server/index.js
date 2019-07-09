require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const session = require("express-session");
const checkForSession = require("./middlewares/checkForSession");
const swag = require("./controllers/swagController");
const auth = require("./controllers/authController");
const cart = require("./controllers/cartController");
const search = require("./controllers/searchController");

const app = express();
const { SERVER_PORT, SESSION_SECRET } = process.env;

//Top Level Middleware
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}./../build`));

//End Points
app.get("/api/swag", swag.read);

app.post("/api/login", auth.login);
app.post("/api/register", auth.register);
app.post("/api/signout", auth.signout);
app.get("/api/user", auth.getUser);

app.post("/api/cart/checkout", cart.checkout);
app.post("/api/cart/:id", cart.add);
app.delete("/api/cart/:id", cart.delete);

app.get("/api/search", search.search);

//Listening
app.listen(SERVER_PORT, () =>
  console.log(`Server listening from port ${SERVER_PORT}`)
);
