const mongoose = require("mongoose");

const PeriodTypeEnum = ["quarter", "overtime"];

const PeriodSchema = new mongoose.Schema({
  type_: {
    type: String,
    enum: PeriodTypeEnum,
    required: true,
  },
  index: { type: Number, minimun: 1 },
});

module.exports = mongoose.model("Period", PeriodSchema);
