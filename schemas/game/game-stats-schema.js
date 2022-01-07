const mongoose = require("mongoose");
const Team = require("../team-list/team/team");
const Player = require("../player-list/player");

const PeriodScoreSchema = {
  index: { type: Number },
  "home-value": { type: Number, required: false },
  "away-value": { type: Number, required: false },
};
// todo: check with Alex if these functions need to be implemented in other path
const totalScore = () => ({});
const homeTotal = () => totalScore();
const awayTotal = () => totalScore();

const ScoreProgressionBlockSchema = {
  scores: {
    ...PeriodScoreSchema,
  },
  "home-total": {
    type: Number,
    required: false,
    default: homeTotal,
  },
  "away-total": {
    type: Number,
    required: false,
    default: awayTotal,
  },
};

const LeaderSchema = {
  player: { type: mongoose.Schema.Types.ObjectId, ref: Player },
  value: { type: Number },
};

const PlayerLeadersSchema = {
  "points-leader": { type: LeaderSchema, required: false },
  "rebounds-leader": { type: LeaderSchema, required: false },
  "assists-leader": { type: LeaderSchema, required: false },
};

const CumulatedTotalsSchema = {
  "field-goals": { type: Number, require: false },
  "field-goals-3-points": { type: Number, require: false },
  "free-throws": { type: Number, require: false },
  "offensive-rebounds": { type: Number, require: false },
  "defensive-rebounds": { type: Number, require: false },
  rebounds: { type: Number, require: false },
  assists: { type: Number, require: false },
  turnovers: { type: Number, require: false },
  steals: { type: Number, require: false },
  "blocked-shots": { type: Number, require: false },
  "personal-fouls": { type: Number, require: false },
};

const PerGameSchema = {
  "fast-break-points": { type: Number, require: false },
  "biggest-lead": { type: Number, require: false },
  "points-in-the-paint": { type: Number, require: false },
  "points-from-the-bench": { type: Number, require: false },
  "points-from-turnovers": { type: Number, require: false },
  "second-chance-points": { type: Number, require: false },
  "biggest-scoring-run": { type: Number, require: false },
  "time-leading": { type: String, require: false, minlength: 1 },
};

const TeamGameStatsSchema = {
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Team,
  },
  ...PlayerLeadersSchema,
  ...CumulatedTotalsSchema,
  ...PerGameSchema,
};

const ScoreProgressionSchema = {
  quarters: {
    ...ScoreProgressionBlockSchema,
  },
  overtimes: {
    ...ScoreProgressionBlockSchema,
  },
};

const GameStatsSchema = new mongoose.Schema({
  scores: { ...ScoreProgressionSchema },
  "home-stats": { ...TeamGameStatsSchema },
  "away-stats": { ...TeamGameStatsSchema },
});

module.exports = mongoose.model("GameStats", GameStatsSchema);
