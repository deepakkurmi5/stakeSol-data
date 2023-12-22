const LstSchema = require("../models/lst.model");
const LstHistoricalSchema = require("../models/lst.historical.model");
const StakingSchema = require("../models/staking.model");
const StakedHistoricalSchema = require("../models/staking.historical.model");
const ApyLstSchema = require("../models/apy-lst.model");
const ScoreLstSchema = require("../models/score-lst.model");
const TotalStkaedLstSchema = require("../models/totalStaked-lst.model");
const TotalStakedUsdLstSchema = require("../models/totalStakedUsd-lst.model");
const TruePriceLstSchema = require("../models/truePrice-lst.model");

const { lstApi } = require("./historical");
const { StakingdApi } = require("./staking");
const {
  truePriceField,
  totalStakedUsdField,
  totalStakedField,
  apyField,
  scoreField,
} = require("./util-helper");

const HourlyLstStored = async (timestamp, connection) => {
  const data = await lstApi(timestamp, connection);

  for (let i = 0; i < data?.length; i++) {
    const element = data[i];
    const findElement = await LstSchema.findOne({ symbol: element.symbol });
    if (findElement) {
      await LstSchema.findOneAndUpdate(
        { symbol: findElement.symbol },
        {
          ...element,
        }
      );
    } else {
      const store = new LstSchema(element);
      await store.save();
    }
  }
};

const DayLstHistoricalStored = async (timestamp, connection) => {
  try {
    const data = await lstApi(timestamp, connection);

    let truePrice = truePriceField;
    let totalStakedUsd = totalStakedUsdField;
    let totalStaked = totalStakedField;
    let score = scoreField;
    let apy = apyField;

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const store = new LstHistoricalSchema(element);
      await store.save();
      truePrice["timestamp"] = element.timestamp;
      truePrice[element.symbol] = element.truePrice;
      totalStakedUsd["timestamp"] = element.timestamp;
      totalStakedUsd[element.symbol] = element.totalStakedUsd;
      totalStaked["timestamp"] = element.timestamp;
      totalStaked[element.symbol] = element.totalStaked;
      score["timestamp"] = element.timestamp;
      score[element.symbol] = element.score;
      apy["timestamp"] = element.timestamp;
      apy[element.symbol] = element.apy;
    }
    const truePriceLStore = new TruePriceLstSchema(truePrice);
    const totalStakedUsdStore = new TotalStakedUsdLstSchema(totalStakedUsd);
    const totoalStakedStore = new TotalStkaedLstSchema(totalStaked);
    const scoreStore = new ScoreLstSchema(score);
    const apyStore = new ApyLstSchema(apy);
    await truePriceLStore.save();
    await totalStakedUsdStore.save();
    await totoalStakedStore.save();
    await scoreStore.save();
    await apyStore.save();
  } catch (error) {
    console.log("DayLstHistoricalStored", error);
  }
};

const HourlyStakingStored = async (connection) => {
  const data = await StakingdApi(connection);

  const findElement = await StakingSchema.findOne({ key: "staking" });
  if (findElement) {
    await StakingSchema.findOneAndUpdate(
      { key: findElement.key },
      {
        ...data,
      }
    );
  } else {
    const store = new StakingSchema(data);
    await store.save();
  }
};

const DayHistoricalStakingStored = async (timestamp, connection) => {
  try {
    const data = await StakingdApi(connection);

    const stored = new StakedHistoricalSchema({
      timestamp: timestamp,
      totalStaked: data.totalStaked,
      totalStakedUsd: data.totalStakedUsd,
      totalLst: data.totalLst,
      totalLstUsd: data.totalLstUsd,
    });
    await stored.save();
  } catch (error) {
    console.log("DayHistoricalStakingStored", error);
    const stored = new StakedHistoricalSchema({
      timestamp: timestamp,
      totalStaked: 0,
      totalStakedUsd: 0,
      totalLst: 0,
      totalLstUsd: 0,
    });
    await stored.save();
  }
};

module.exports = {
  HourlyLstStored,
  DayLstHistoricalStored,
  HourlyStakingStored,
  DayHistoricalStakingStored,
};
