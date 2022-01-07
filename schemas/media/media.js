const mongoose = require("mongoose");
const imageCloudinary = require("../../common/image-cloudinary");

const MediaItemTypeEnum = ["article", "gallery", "video", "lbtv-video"];

const MediaItemSchemaDefinition = {
  "media-item-type": {
    type: String,
    enum: MediaItemTypeEnum,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  title: {
    type: String,
    minlength: 1,
    required: true,
  },
  thumbnail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: imageCloudinary,
  },
};

const ArticleSchema = new mongoose.Schema({
  ...MediaItemSchemaDefinition,
});

const GallerySchema = new mongoose.Schema({
  "number-of-photos": {
    type: Number,
    min: 1,
    required: true,
  },
  ...MediaItemSchemaDefinition,
});

const VideoSchema = new mongoose.Schema({
  duration: {
    type: Number,
    required: true,
  },
  "youtube-id": {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  ...MediaItemSchemaDefinition,
});

const LBTVVideoSchema = new mongoose.Schema({
  duration: {
    type: Number,
    required: true,
  },
  "is-live": {
    type: Boolean,
    required: true,
  },
  "perform-asset-id": {
    type: String,
    required: true,
  },
  ...MediaItemSchemaDefinition,
});
const ArticleModel = mongoose.model("ArticleModel", ArticleSchema);
const GalleryModel = mongoose.model("GalleryModel", GallerySchema);
const VideoModel = mongoose.model("VideoModel", VideoSchema);
const LBTVVideoModel = mongoose.model("LBTVVideoModel", LBTVVideoSchema);

module.exports = {
  ArticleModel,
  GalleryModel,
  VideoModel,
  LBTVVideoModel,
};
