// imports/requires
require("dotenv").config();
const cors = require('cors');

const express = require("express");
const connectMongoDB = require("./db/ConnectMongo");

connectMongoDB();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors())

app.use(express.json());

app.use("/api/v1/wallet", require("./routes/address"))

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}`)
);