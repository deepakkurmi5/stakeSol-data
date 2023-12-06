const mongoose = require("mongoose");
const { lstModelTokens } = require("./model.helper");

const TotalStkaedLstModel = mongoose.Schema(
  {
    timestamp: {
      type: Number,
      required: true,
    },
    ...lstModelTokens,
  },
  { collection: "totalStaked-lst" }
);

const TotalStkaedLstSchema = new mongoose.model(
  "totalStaked-lst",
  TotalStkaedLstModel
);

module.exports = TotalStkaedLstSchema;
