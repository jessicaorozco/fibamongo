/* eslint-disable new-cap */
const mongoose = require("mongoose");
const Period = require("./game-period-schema");

const PeriodScoreSchema = {
  period: { type: mongoose.Schema.Types.ObjectId, ref: Period },
  home_score: { type: Number, minimum: 0 },
  away_score: { type: Number, minimum: 0 },
};

const GameTriggersSchema = new mongoose.Schema({
  "game-started": { type: Boolean, default: false },
  "game-ended": { type: Boolean, default: false },
  "period-list": { ...PeriodScoreSchema },
});

const GameTriggers = mongoose.model("GameTriggers", GameTriggersSchema);

module.exports = GameTriggers;
