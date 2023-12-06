const mongoose = require('mongoose');

const LstModel = mongoose.Schema(
  {
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
  { timestamps: true, collection: 'lst' }
);

const LstSchema = new mongoose.model('lst', LstModel);

module.exports = LstSchema;
