const mongoose = require("mongoose");

const RoundDescriptor = {
  "event-id": { type: Number },
  "round-id": { type: Number },
  "round-code": { type: String },
  "round-name": { type: String },
  "is-group-round": { type: Boolean },
};

const GameDescriptorSchema = new mongoose.Schema({
  "group-name": { type: String },
  "game-name": { type: String },
  ...RoundDescriptor,
});

module.exports = mongoose.model("GameDescriptor", GameDescriptorSchema);
