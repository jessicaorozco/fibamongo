const mongoose = require("mongoose");

const BroadcasterDefinition = {
  title: {
    type: String,
    minlength: 1,
  },
  link: {
    type: String,
    required: false,
  },
  "country-code": {
    type: String,
    minlength: 2,
    maxlength: 2,
    required: false,
  },
};

const GameDetailsSchema = new mongoose.Schema({
  "buy-tickets-link": {
    type: String,
    required: false,
  },
  broadcasters: {
    ...BroadcasterDefinition,
  },
});

module.exports = mongoose.model("GameDetails", GameDetailsSchema);
