const mongoose = require("mongoose");

const imageCloudinaryschema = new mongoose.Schema({
  "public-id": {
    type: String,
    required: true,
  },
});

const imageCloudinary = mongoose.model(
  "imageCloudinary",
  imageCloudinaryschema
);

module.exports = imageCloudinary;
