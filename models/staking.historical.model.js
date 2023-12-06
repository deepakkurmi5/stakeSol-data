const mongoose = require("mongoose");

const StakingHistoricalModel = mongoose.Schema(
  {
    timestamp: {
      type: Number,
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
  { collection: "staking-historical" }
);

const StakedHistoricalSchema = new mongoose.model(
  "staking-historical",
  StakingHistoricalModel
);

module.exports = StakedHistoricalSchema;
