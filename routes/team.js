const express = require("express");
const router = express.Router();
const Team = require("../schemas/team-list/team/team");

router.get("/api/team", async (req, res, next) => {});

router.post("/api/team", async (req, res, next) => {
  const team = new Team({
    logo: req.body.logo,
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    country: req.body.country,
  });
  const result = await team.save();
  res.status(201).json(result);
  next();
});

module.exports = router;
