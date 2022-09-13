const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const bodyparser = require("body-parser");

app.use(express.json({ limit: "50mb" }));
app.use(cookieparser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const user = require("./routes/userRoutes");
const client = require("./routes/clientRoutes");
const task = require("./routes/taskRoutes");

app.use("/api/v2", user);
app.use("/api/v2", client);
app.use("/api/v2", task);

module.exports = app;
