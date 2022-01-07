const mongoose = require("mongoose");
const {
  GameDefinition,
} = require("../game-schema-definition/game-schema-definition");

const GameDetails = require("../game-details-schema");
const TeamBoxscores = require("../game-boxscore-schema");
const GamePlayerSchema = require("../game-plays-schema");
const GameStats = require("../game-stats-schema");
const GameDescriptorSchema = require("../game-descriptor-schema");
const GameTriggers = require("../game-triggers-schema");
const Team = require("../../team-list/team/team");

const GameTeamInfoSchema = {
  team: { type: mongoose.Schema.Types.ObjectId, ref: Team, required: true },
  score: { type: Number, minimum: 0 },
  "aggregated-score": { type: Number, minimum: 0, required: false },
};

const GameSeedSchema = {
  "group-name": { type: String, minlength: 1 },
  rank: { type: Number, minimum: 0, require: true },
  "is-winner": { type: Boolean, require: false },
  // todo: check with Alex if these functions need to be implemented in other path
};

const PreGameTeamInfo = {
  team: { type: mongoose.Schema.Types.ObjectId, ref: Team },
  seeded: { ...GameSeedSchema },
};

const PreGameSchema = new mongoose.Schema({
  "type-name": {
    type: String,
    required: function () {
      return "pre-game";
    },
  },
  "is-time-tbc": {
    type: Boolean,
  },
  home: {
    ...PreGameTeamInfo,
  },
  away: {
    ...PreGameTeamInfo,
  },
  // ...GameDefinition,
});

const LiveGameSchema = new mongoose.Schema({
  "type-name": {
    type: String,
    required: function () {
      return "live-game";
    },
  },
  quarter: {
    type: String,
    minlength: 1,
  },
  time: {
    type: String,
    minlength: 1,
  },
  "on-break": {
    type: Boolean,
  },
  home: {
    ...GameTeamInfoSchema,
  },
  away: {
    ...GameTeamInfoSchema,
  },
  // ...GameDefinition,
});

const PostGameSchema = new mongoose.Schema({
  "type-name": {
    type: String,
    required: function () {
      return "post-game";
    },
  },
  home: {
    type: GameTeamInfoSchema,
  },
  away: {
    type: GameTeamInfoSchema,
  },
  // ...GameDefinition,
});

const GameProfileSchema = new mongoose.Schema({
  meta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: GameDefinition,
  },
  info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: GameDetails,
    required: false,
  },
  boxscores: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TeamBoxscores,
    minlength: 1,
    maxlength: 2,
    required: false,
  },
  stats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: GameStats,
    required: false,
  },
  "play-by-play": {
    type: mongoose.Schema.Types.ObjectId,
    ref: GamePlayerSchema,
    minlength: 1,
    required: false,
  },
  descriptor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: GameDescriptorSchema,
  },
  triggers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: GameTriggers,
  },
  delivery_time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PreGame", PreGameSchema);
module.exports = mongoose.model("LiveGame", LiveGameSchema);
module.exports = mongoose.model("PostGame", PostGameSchema);
module.exports = mongoose.model("GameProfile", GameProfileSchema);
