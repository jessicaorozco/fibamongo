const express = require("express");
const router = express.Router();
const TeamBoxscores = require("../schemas/game/game-boxscore-schema");
const Player = require("../schemas/player-list/player");
const GameTriggers = require("../schemas/game/game-triggers-schema");
const Period = require("../schemas/game/game-period-schema");

router.get("/api/game", async (req, res, next) => {});

router.post("/api/gameprofile", async (req, res, next) => {});

router.post("/api/gameboxscore", async (req, res, next) => {
  const teamboxscores = new TeamBoxscores({
    team: req.body.team,
    court: {
      player: req.body.player,
      "is-player-starter": req.body.playerstarter,
      "minutes-played": req.body.minutesplayer,
    },
    bench: {
      player: req.body.player,
      "is-player-starter": req.body.playerstarter,
      "minutes-played": req.body.minutesplayer,
    },
    roster: {
      player: req.body.player,
      "is-player-starter": req.body.playerstarter,
      "minutes-played": req.body.minutesplayer,
    },
    total: {
      "total-points": req.body.totalpoints,
      rebounds: {
        offensive: req.body.offensive,
        defensive: req.body.defensive,
        total: req.body.total,
      },
      assists: req.body.assists,
      steals: req.body.steals,
      "blocked-shots": req.body.blockedshots,
      "personal-fouls": req.body.personalfouls,
      "field-goals": {
        made: req.body.made,
        attempt: req.body.attempt,
        percentage: req.body.percentage,
      },
      "field-goals-2-points": {
        made: req.body.made,
        attempt: req.body.attempt,
        percentage: req.body.percentaje,
      },
      "field-goals-3-points": {
        made: req.body.made,
        attempt: req.body.attempt,
        percentage: req.body.percentaje,
      },
      "free-throws": {
        made: req.body.made,
        attempt: req.body.attempt,
        percentage: req.body.percentaje,
      },
      turnovers: req.body.turnovers,
    },
  });
  const result = await teamboxscores.save();
  res.status(201).json(result);
});

router.post("/api/player", async (req, res, next) => {
  const player = new Player({
    "first-name": req.body.firstname,
    "last-name": req.body.lastname,
    "head-shot": req.body.headshot,
    height: {
      centimeters: req.body.centimeters,
      inches: req.body.inches,
    },
    position: req.body.position,
    "shirt-number": req.body.shirtnumber,
  });
  const result = await player.save();
  res.status(201).json(result);
});

router.post("/api/gamedescriptor", async (req, res, next) => {});

router.post("/api/gamedetails", async (req, res, next) => {});

router.post("/api/gameperiod", async (req, res, next) => {
  const period = new Period({
    type_: req.body.type,
    index: req.body.index,
  });
  const result = await period.save();
  res.status(201).json(result);
});

router.post("/api/gameplay", async (req, res, next) => {});

router.post("/api/gamestats", async (req, res, next) => {});

router.post("/api/gametriggers", async (req, res, next) => {
  const gametriggers = new GameTriggers({
    "game-started": req.body.gamestarter,
    "game-ended": req.body.gameended,
    "period-list": req.body.periodlist,
  });
  const result = await gametriggers.save();
  res.status(201).json(result);
});

module.exports = router;
