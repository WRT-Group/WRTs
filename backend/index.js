require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/router");
const connectDB = require("./database/conenction");
const userRoute = require("./routes/user.router");
const morgan = require("morgan");

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/user", userRoute);

connectDB();

app.use(router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
