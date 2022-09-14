const { Schema, model } = require("mongoose");

const graffitiSchema = new Schema(
  {
    title: String,
    description: String,
    imageUrl: [{String}],
    imgName: String,
    owner: {
      type: Schema.Types.ObjectId,
		  ref: 'User'
    }
  }
);

const Graffiti = model("Graffiti", graffitiSchema);
module.exports = Graffiti;
