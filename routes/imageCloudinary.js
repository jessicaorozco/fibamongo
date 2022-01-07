const express = require("express");
const router = express.Router();
const imageCloudinary = require("../common/image-cloudinary");

router.get("/api/imageCloudinary", async (req, res, next) => {
  const thumbnail = await imageCloudinary.find();
  res.status(200).json(thumbnail);
});

router.post("/api/imageCloudinary", async (req, res, next) => {
  const thumbnail = new imageCloudinary({
    "public-id": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
  });
  try {
    const result = await thumbnail.save();
    res.status(201).json(result);
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = router;
