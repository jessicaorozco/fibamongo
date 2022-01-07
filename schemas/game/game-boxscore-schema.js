const mongoose = require("mongoose");
const Team = require("../team-list/team/team");
const Player = require("../player-list/player");
const router = require("../../routes/game");

const calculateAccuracyPercentage = () => {};

const buildTotal = () => calculateAccuracyPercentage;

const ReboundsSchema = {
  offensive: { type: Number, required: false },
  defensive: { type: Number, required: false },
  total: { type: Number, required: false },
};

const AccuracyStatSchma = {
  made: {
    type: Number,
    required: true,
  },
  attempt: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: false,
  },
};

const FieldGoalsDefinition = {
  ...AccuracyStatSchma,
};

const BoxscoreSchema = {
  "total-points": {
    type: Number,
    required: false,
  },
  rebounds: {
    ...ReboundsSchema,
  },
  assists: {
    type: Number,
    required: true,
  },
  steals: {
    type: Number,
    required: false,
  },
  "blocked-shots": {
    type: Number,
    required: false,
  },
  "personal-fouls": {
    type: Number,
    required: true,
  },
  "field-goals": { ...FieldGoalsDefinition },
  "field-goals-2-points": { ...FieldGoalsDefinition },
  "field-goals-3-points": { ...FieldGoalsDefinition },
  "free-throws": { ...FieldGoalsDefinition },
  turnovers: { type: Number, required: true },
};

const PlayerBoxscoreSchema = {
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Player,
    required: false,
  },
  "is-player-starter": {
    type: Boolean,
  },
  "minutes-played": {
    type: Number,
    required: false,
  },
};

const TeamBoxscoresSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Team,
  },
  court: {
    ...PlayerBoxscoreSchema,
  },
  bench: {
    ...PlayerBoxscoreSchema,
  },
  roster: {
    ...PlayerBoxscoreSchema,
  },
  total: {
    // type: BoxscoreSchema || buildTotal,
    type: BoxscoreSchema,
  },
});

module.exports = mongoose.model("TeamBoxscores", TeamBoxscoresSchema);
