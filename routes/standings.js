const express = require("express");
const router = express.Router();
const {
  GroupBracketsSingleGame,
  RoundGroupStandings,
  RoundBrackets,
  GroupBracketsHomeAway,
} = require("../schemas/standings/standings");

router.get("/api/standings", async (req, res, next) => {});

router.post("/api/standings", async (req, res, next) => {
  const { GroupBracketsTypeEnum } = req.body;
  switch (GroupBracketsTypeEnum) {
    case "group-brackets-single-game":
      const groupbracketsinglegame = new GroupBracketsSingleGame({
        game: req.body.game,
        "group-brackets-type": req.body.groupbracketstypeenum,
      });
      const result = await groupbracketsinglegame.save();
      res.status(201).json(result);
      break;

    case "group-brackets-home-away":
      const groupbracketshomeaway = new GroupBracketsHomeAway({
        games: req.body.games,
      });
      break;
  }
});

module.exports = router;
