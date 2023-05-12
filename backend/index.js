require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./database/conenction");
const NFTRouter = require("./routes/NFTRouter");
const userRouter = require("./routes/userRouter");
const walletRouter=require("./routes/walletRouter")
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;

const port = 3001;

cloudinary.config({
  cloud_name: process.env.cloud,
  api_key: process.env.cloud_key,
  api_secret: process.env.cloud_api_secret,
});

app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(express.json({ limit: "25mb" }));
app.use(cors());
app.use(morgan("dev"));
connectDB();

app.use("/NFT", NFTRouter);
app.use("/user", userRouter);
app.use("/wallet", walletRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
