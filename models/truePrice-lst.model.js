const mongoose = require("mongoose");
const { lstModelTokens } = require("./model.helper");

const TruePriceLstModel = mongoose.Schema(
  {
    timestamp: {
      type: Number,
      required: true,
    },
    ...lstModelTokens,
  },
  { collection: "truePrice-lst" }
);

const TruePriceLstSchema = new mongoose.model(
  "truePrice-lst",
  TruePriceLstModel
);

module.exports = TruePriceLstSchema;
