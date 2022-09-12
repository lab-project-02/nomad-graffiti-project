const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const graffitiSchema = new Schema(
  {
    name: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Graffiti = model("Graffiti", graffitiSchema);

module.exports = Graffiti;
