const mongoose = require("mongoose");
const { lstModelTokens } = require("./model.helper");

const ApyLstModel = mongoose.Schema(
  {
    timestamp: {
      type: Number,
      required: true,
    },
    ...lstModelTokens,
  },
  { collection: "apy-lst" }
);

const ApyLstSchema = new mongoose.model("apy-lst", ApyLstModel);

module.exports = ApyLstSchema;
