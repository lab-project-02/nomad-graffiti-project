const { Schema, model } = require("mongoose");

const graffitiSchema = new Schema(
  {
    title: String,
    description: String,
    imgName: String,
    imgPath: String
  }
);

const Graffiti = model("Graffiti", graffitiSchema);
module.exports = Graffiti;
