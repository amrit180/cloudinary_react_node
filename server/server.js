const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { cloudinary } = require("./utils/cloudinary");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.post("/api/upload-image", async (req, res) => {
  try {
    const fileStr = req.body.urls;
    const fName = req.body.fName;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "imagetest",
    });
    console.log(uploadResponse, "upload response");
    res.json(uploadResponse);
  } catch (error) {
    console.log(error, "message");
  }
});

app.delete("/api/delete-image", async (req, res) => {
  try {
    const uploadResponse = await cloudinary.uploader.destroy(
      res.body.public_id
    );
    console.log(uploadResponse, "delete response");
    res.json(uploadResponse);
  } catch (error) {
    console.log(error, "message");
  }
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
