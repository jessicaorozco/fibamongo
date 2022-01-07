const mongoose = require("mongoose");
const Team = require("../team-list/team/team");
const Player = require("../player-list/player");
const Period = require("../game/game-period-schema");

const ScoreSchema = {
  home: { type: Number, minlength: 0 },
  away: { type: Number, minlength: 0 },
};

const GamePlayerSchema = new mongoose.Schema({
  period: { type: mongoose.Schema.Types.ObjectId, ref: Period },
  time: { type: String, minlength: 1 },
  team: { type: mongoose.Schema.Types.ObjectId, ref: Team, minlength: 1 },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Player,
    required: false,
  },
  description: { type: String, minlength: 1 },
  score: { type: ScoreSchema, required: false },
  "is-home-team-action": { type: Boolean },
});

module.exports = mongoose.model("GamePlayerSchema", GamePlayerSchema);
