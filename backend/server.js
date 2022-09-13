const app = require("./app");
const connectToDatabase = require("./config/Database");
const port = process.env.PORT || 8000;
const express = require("express");
const path = require("path");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

connectToDatabase();

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server Is Running on http://localhost:${port}`);
});
