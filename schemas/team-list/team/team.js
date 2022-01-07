const mongoose = require("mongoose");
const ImageCloudinary = require("../../../common/image-cloudinary");

const TeamSchemaDefinition = {
  logo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ImageCloudinary,
  },
  name: {
    type: String,
    minlength: 1,
    required: true,
  },
  abbreviation: {
    type: String,
    minlength: 1,
    required: true,
  },
  country: {
    type: String,
    minlength: 1,
    required: true,
  },
};
const teamSchema = new mongoose.Schema({
  ...TeamSchemaDefinition,
});

module.exports = mongoose.model("Team", teamSchema);
