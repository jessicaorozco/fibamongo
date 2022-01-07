const mongoose = require("mongoose");
const ImageCloudinary = require("../../common/image-cloudinary");

const PlayerPositionEnum = [
  "point-guard",
  "shooting-guard",
  "guard",
  "center",
  "forward",
  "power-forward",
  "small-forward",
];

const PlayerSchemaDefinition = new mongoose.Schema({
  "first-name": {
    type: String,
    minlength: 1,
  },
  "last-name": {
    type: String,
    minlength: 1,
  },
  "head-shot": { type: mongoose.Schema.Types.ObjectId, ref: ImageCloudinary },
  height: {
    centimeters: { type: Number, min: 0, exclusive: true },
    inches: { type: Number, min: 0, exclusive: true },
  },
  position: {
    type: String,
    enum: PlayerPositionEnum,
  },
  "shirt-number": {
    type: Number,
    minlength: 1,
  },
});

module.exports = mongoose.model("Player", PlayerSchemaDefinition);
