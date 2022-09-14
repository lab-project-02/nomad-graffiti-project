const { Schema, model } = require("mongoose");

const graffitiSchema = new Schema(
  {
    title: String,
    description: String,
    hashtags: String,
    photographer: String,
    imageUrl: String,
    imgName: String,
    owner: {
      type: Schema.Types.ObjectId,
		  ref: 'User'
    },
    location: String,
  }
);

const Graffiti = model("Graffiti", graffitiSchema);
module.exports = Graffiti;
