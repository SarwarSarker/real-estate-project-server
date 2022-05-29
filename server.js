const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userHadler = require("./routes/userRoute");
const bookHotelHadler = require("./routes/bookHotelRoute");

const app = express();
var cors = require('cors')

app.use(cors())
dotenv.config();
app.use(express.json());

const port = process.env.PORT || 5000;
const url = process.env.DB_URL;

//mongoose connetion
mongoose
  .connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connecting Successfully"))
  .catch(() => console.log("DB Connection Failed"));
  
//application route
app.use("/api/user", userHadler);
app.use("/api/bookHotel",bookHotelHadler);

//default error handler
const errHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errHandler);

app.get("/api", (req, res) => {
  res.send("Successfull response");
});

app.listen(port, () => console.log(`Server is listening at ${port}`));
