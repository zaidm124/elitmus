const express = require("express");
const bodyParser = require("body-parser");

const userRoute = require("./routes/user");
const progressRoute = require("./routes/progress");
const adminRoute = require("./routes/admin");

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));


app.use("/user", userRoute);
app.use("/progress", progressRoute);
app.use("/admin",adminRoute );

module.exports = app;
