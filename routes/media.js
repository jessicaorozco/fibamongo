const express = require("express");
const router = express.Router();
const {
  ArticleModel,
  GalleryModel,
  VideoModel,
  LBTVVideoModel,
} = require("../schemas/media/media");

router.get("/api/media", async (req, res, next) => {});

router.post("/api/media", async (req, res, next) => {
  const { mediaItem } = req.body;
  switch (mediaItem) {
    case "article":
      const article = new ArticleModel({
        "media-item-type": req.body.mediaItem,
        title: req.body.title,
        thumbnail: req.body.thumbnail,
      });
      try {
        const result = await article.save();
        res.status(201).json(result);
      } catch (e) {
        throw new Error(e);
      }
      break;

    case "gallery":
      const gallery = new GalleryModel({
        "media-item-type": req.body.mediaItem,
        "number-of-photos": req.body.numberphotos,
        title: req.body.title,
        thumbnail: req.body.thumbnail,
      });
      try {
        const result = await gallery.save();
        res.status(201).json(result);
      } catch (e) {
        throw new Error(e);
      }
      break;

    case "video":
      const video = new VideoModel({
        duration: req.body.duration,
        "youtube-id": req.body.youtubeid,
        link: req.body.link,
        "media-item-type": req.body.mediaItem,
        title: req.body.title,
        thumbnail: req.body.thumbnail,
      });
      try {
        const result = await video.save();
        res.status(201).json(result);
      } catch (e) {
        throw new Error(e);
      }
      break;

    case "lbtv-video":
      const LBTVideo = new LBTVVideoModel({
        duration: req.body.duration,
        "media-item-type": req.body.mediaItem,
        "is-live": req.body.islive,
        "perform-asset-id": req.body.perform,
        title: req.body.title,
        thumbnail: req.body.thumbnail,
      });
      try {
        const result = await LBTVideo.save();
        res.status(201).json(result);
      } catch (e) {
        throw new Error(e);
      }
      break;

    default:
      res
        .status(404)
        .json("debe seleccionar article, gallery, video o LBTVVideo");
  }
});

module.exports = router;
