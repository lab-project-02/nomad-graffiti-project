const { Schema, model } = require("mongoose");

const graffitiSchema = new Schema(
  {
    title: String,
    description: String,

    photographer: String,
    imageUrl: String,
    imgName: String,
    owner: {
      type: Schema.Types.ObjectId,
		  ref: 'User'
    },
    location: {
      type: { type: String },
      coordinates: [Number]
    },
  }
);

const Graffiti = model("Graffiti", graffitiSchema);
module.exports = Graffiti;
