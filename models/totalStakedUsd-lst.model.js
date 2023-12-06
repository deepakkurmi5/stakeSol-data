const mongoose = require('mongoose');
const { lstModelTokens } = require('./model.helper');

const TotalStakedUsdLstModel = mongoose.Schema(
  {
    timestamp: {
      type: Number,
      required: true,
    },
    ...lstModelTokens,
  },
  { collection: 'totalStakedUsd-lst' }
);

const TotalStakedUsdLstSchema = new mongoose.model('totalStakedUsd-lst', TotalStakedUsdLstModel);

module.exports = TotalStakedUsdLstSchema;
