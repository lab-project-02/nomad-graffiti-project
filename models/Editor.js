const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const editorSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    password: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Editor = model("Editor", editorSchema);

module.exports = Editor;
