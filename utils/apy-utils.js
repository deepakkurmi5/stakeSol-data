// const axios = require('axios');
const moment = require("moment");

// const api = require('../api');
const LstHistoricalSchema = require("../models/lst.historical.model");

const days = 29;

const getApy = async (symbol) => {
  try {
    if (!symbol) return 0;

    var subtractDate = moment().subtract(days, "days");
    var parsesSubtractDate = new Date(subtractDate);
    parsesSubtractDate = Date.parse(parsesSubtractDate);

    const findDetails = await LstHistoricalSchema.find({
      symbol: symbol,
      timestamp: { $gte: parsesSubtractDate },
    });

    // const res = await axios.get(`${api.lstDetailHistoricalBySymbol}?symbol=${symbol}&&day=${days}`);
    // const findDetails = res?.data;

    if (findDetails.length < 28) return 0;

    const latestTruePrice = findDetails[27].truePrice;
    const oldestTruePrice = findDetails[0].truePrice;

    const apy =
      ((1 + (latestTruePrice - oldestTruePrice) / oldestTruePrice) **
        (365 / days) -
        1) *
      100;

    return apy;
  } catch (error) {
    return 0;
  }
};

module.exports = { getApy };
