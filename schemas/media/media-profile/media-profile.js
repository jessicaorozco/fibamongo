/* eslint-disable new-cap */
const mongoose = require("mongoose");
const {
  ArticleSchema,
  GallerySchema,
  VideoSchema,
  LBTVVideoSchema,
} = require("../media-item/media-item");
const ImageCloudinarySchema = require("../../common/image-cloudinary/image-cloudinary");

const VideoCategoryListSchemaDefinition = new mongoose.Schema({
  "category-list": {
    type: [
      {
        type: String,
        enum: [
          "highlights",
          "top-10",
          "top-5",
          "press-conference",
          "must-watch",
          "full-games",
          "top-players",
          "top-plays",
          "lbtv",
          "flying-moments",
          "buzzer-beaters",
          "players-of-the-game",
          "player-highlights",
        ],
      },
    ],
  },
});

const MediaItemRelationsSchemaDefinition = {
  language: {
    type: String,
    minlength: 2,
  },
  "related-team-ids": {
    type: [Number],
    required: true,
  },
  "related-player-ids": {
    type: [Number],
    required: true,
  },
  "related-game-ids": {
    type: [Number],
    required: true,
  },
};

const ShareableSchemaDefinition = {
  "share-link": {
    type: String,
    required: true,
  },
};

const ArticleProfileSchema = new mongoose.Schema({
  meta: {
    type: ArticleSchema,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  ...MediaItemRelationsSchemaDefinition,
});

const GalleryProfileSchema = new mongoose.Schema({
  meta: {
    type: GallerySchema,
    required: true,
  },
  photos: {
    type: [
      new mongoose.Schema({
        picture: {
          type: ImageCloudinarySchema,
          required: true,
        },
        caption: {
          type: String,
          minlength: 1,
        },
        ...ShareableSchemaDefinition,
      }),
    ],
    minItems: 1,
    required: true,
  },
  ...MediaItemRelationsSchemaDefinition,
});

const VideoProfileSchema = new mongoose.Schema({
  meta: {
    type: VideoSchema,
    required: true,
  },
  "youtube-original-title": {
    type: String,
    required: true,
  },
  ...VideoCategoryListSchemaDefinition,
});

const LBTVVideoProfileSchema = new mongoose.Schema({
  meta: {
    type: LBTVVideoSchema,
    required: true,
  },
  "omit-from-all": {
    type: Boolean,
    required: true,
  },
  ...VideoCategoryListSchemaDefinition,
});

module.exports = {
  ArticleProfileSchema,
  GalleryProfileSchema,
  VideoProfileSchema,
  LBTVVideoProfileSchema,
};
