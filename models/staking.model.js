const mongoose = require("mongoose");

const StakingModel = mongoose.Schema(
  {
    key: {
      type: String,
      default: "staking",
      required: true,
    },
    totalStaked: {
      type: Number,
      required: true,
    },
    totalStakedUsd: {
      type: Number,
      required: true,
    },
    totalLst: {
      type: Number,
      required: true,
    },
    totalLstUsd: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, collection: "staking" }
);

const StakingSchema = new mongoose.model("staking", StakingModel);

module.exports = StakingSchema;
