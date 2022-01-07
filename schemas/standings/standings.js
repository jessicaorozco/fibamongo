/* eslint-disable import/no-unresolved */
const mongoose = require("mongoose");
const {
  EventPhaseEnum,
} = require("../game/game-schema-definition/game-schema-definition");
const Team = require("../team-list/team/team");

const RawDocument = undefined; // it should be a Game object

const GameProfile = require("../game/game-profile/game-profile");

const GroupBracketsTypeEnum = [
  "group-brackets-single-game",
  "group-brackets-home-away",
];

const GroupBracketsSchema = {
  "group-brackets-type": {
    type: String,
    enum: GroupBracketsTypeEnum,
    required: true,
  },
};

const StandingSchema = {
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Team,
    required: false,
  },
  rank: { type: Number, minimum: 0 },
  wins: { type: Number, minimum: 0 },
  losses: { type: Number, minimum: 0 },
  points: { type: Number },
  "points-diff": { type: Number, default: (x) => x.points }, //Jess
};

const GroupSchema = {
  name: {
    type: String,
  },
  "qualified-teams": {
    type: String,
    minimun: 1,
  },
  standings: {
    ...StandingSchema,
  },
};

const RoundSchema = {
  id: { type: Number },
  name: { type: String, minlength: 1 },
  phase: {
    type: String,
    enum: EventPhaseEnum,
  },
  number: { type: Number },
  "event-id": { type: Number },
};

const GameSchema = {
  meta: { type: mongoose.Schema.Types.ObjectId, ref: GameProfile },
  "home-aggregated-score": { type: Number, minimum: 0 },
  "away-aggregated-score": { type: Number, required: false },
};

const Qualified = {
  team: { type: mongoose.Schema.Types.ObjectId, ref: GameProfile },
  "next-round-name": { type: String, minlength: 1 },
  "points-diff": { type: Number },
};

const GroupBracketsSingleGameSchema = new mongoose.Schema({
  "type-name": {
    type: String,
    required: function () {
      return "group-brackets-single-game";
    },
  },
  game: { type: mongoose.Schema.Types.ObjectId, ref: GameProfile }, // it should be a Game object
  ...GroupBracketsSchema,
});

const RoundGroupStandingsSchema = new mongoose.Schema({
  groups: { ...GroupSchema },
  ...RoundSchema,
  /* TODO: Add build_son function for validating when a team is duplicated within group standings subdocument in Mongo
     TODO: check with Alex from where these functions should be imported*/
});

const RoundBracketsSchema = new mongoose.Schema({
  groups: { ...GroupBracketsSchema },
  ...RoundSchema,
});

const GroupBracketsHomeAwaySchema = new mongoose.Schema({
  "type-name": {
    type: String,
    required: function () {
      return "group-brackets-home-away";
    },
  },
  games: { ...GameSchema },
  qualified: { type: Qualified, required: false },
  ...GroupBracketsSchema,
});

const GroupBracketsSingleGame = mongoose.model(
  "GroupBracketsSingleGame",
  GroupBracketsSingleGameSchema
);

const RoundGroupStandings = mongoose.model(
  "RoundGroupStandings",
  RoundGroupStandingsSchema
);
const RoundBrackets = mongoose.model("RoundBrackets", RoundBracketsSchema);

const GroupBracketsHomeAway = mongoose.model(
  "GroupBracketsHomeAway",
  GroupBracketsHomeAwaySchema
);

module.exports = {
  GroupBracketsSingleGame,
  RoundGroupStandings,
  RoundBrackets,
  GroupBracketsHomeAway,
};
