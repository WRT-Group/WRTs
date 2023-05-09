require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./database/conenction");
const NFTRouter = require("./routes/NFTRouter");
const userRouter = require("./routes/userRouter")
const morgan = require("morgan");

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
connectDB();

app.use("/NFT", NFTRouter)
app.use("/user", userRouter);


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
