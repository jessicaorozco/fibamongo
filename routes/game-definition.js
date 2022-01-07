const express = require("express");
const router = express.Router();
const {
  GameDefinition,
} = require("../schemas/game/game-schema-definition/game-schema-definition");

router.get("/api/gamedefinition", async (req, res, next) => {});

router.post("/api/gamedefinition", async (req, res, next) => {
  const gamedefinition = new GameDefinition({
    "game-type": req.body.gametype,
    phase: req.body.phase,
    "round-name": req.body.roundname,
    "group-name": req.body.groupname,
    "is-group-round-game": req.body.isgrouproundname,
    venue: req.body.venue,
    "group-name-compatibility": req.body.grounamecompatibility,
  });
  const result = await gamedefinition.save();
  res.status(201).json(result);
  next();
});

module.exports = router;
