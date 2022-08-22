const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    public_id: String,
    secure_url: String,
  },
  { timestamps: true }
);

const image = mongoose.model("Image", imageSchema);

module.exports = image;
