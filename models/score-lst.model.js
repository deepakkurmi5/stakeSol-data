const mongoose = require('mongoose');
const { lstModelTokens } = require('./model.helper');

const ScoreLstModel = mongoose.Schema(
  {
    timestamp: {
      type: Number,
      required: true,
    },
    ...lstModelTokens,
  },
  { collection: 'score-lst' }
);

const ScoreLstSchema = new mongoose.model('score-lst', ScoreLstModel);

module.exports = ScoreLstSchema;
