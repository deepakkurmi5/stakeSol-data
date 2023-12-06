const mongoose = require('mongoose');

const LstHistoricalModel = mongoose.Schema(
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
    truePrice: {
      type: Number,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    apy: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { collection: 'lst-historical' }
);

const LstHistoricalSchema = new mongoose.model('lst-historical', LstHistoricalModel);

module.exports = LstHistoricalSchema;
