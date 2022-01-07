const mongoose = require("mongoose");

const EventPhaseEnum = [
  "africa-qualifiers",
  "asia-qualifiers",
  "americas-qualifiers",
  "europe-qualifiers",
  "qualification",
  "group-phase",
  "play-offs",
  "final-phase",
];

const VenueSchema = {
  city: { type: String, minlength: 1 },
  country: { type: String, minlength: 1 },
  name: { type: String, minlength: 1 },
};

const GameDefinitionSchema = new mongoose.Schema({
  "game-type": {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  phase: {
    type: String,
    enum: EventPhaseEnum,
  },
  "round-name": {
    type: String,
    minlength: 1,
  },
  "group-name": {
    type: String,
    minlength: 1,
  },
  "is-group-round-game": {
    type: Boolean,
    minlength: 1,
  },
  venue: {
    type: VenueSchema,
    required: false,
  },
  "group-name-compatibility": {
    type: String,
    minlength: 1,
    required: false,
    // todo: check with Alex if these functions need to be implemented in other path
    default: () => {},
  },
});

const GameDefinition = mongoose.model(
  "GameDefinitionModel",
  GameDefinitionSchema
);

module.exports = {
  GameDefinition,
};
