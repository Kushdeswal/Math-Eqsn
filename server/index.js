const express = require("express");
const app = express(); // sbhi chije express ki app me aagyi.
const router = require("./Routes/index");
// const mongoose = require('mongoose');
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json({ extended: true, limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

app.use(express.json({ extended: true, limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// console.log(process.env.MONGODB_URL)

app.use("/api", router);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("database connected"))
  .catch((err) => console.log("db not connected"));
app.listen(process.env.PORT, () =>
  console.log(`server is up ${process.env.PORT}`)
);
