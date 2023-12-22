const {
  Marinade,
  MarinadeConfig,
} = require("@marinade.finance/marinade-ts-sdk");

const { getMarinadeStakeingPrice } = require("../utils/token-prices");

/* =================================================================
    Created  GetMarinade Functions To Get Data Using Marinade SDK
==================================================================== */

const getMarinade = async (solPrice, connection) => {
  try {
    const config = new MarinadeConfig({ connection: connection });
    const marinade = new Marinade(config);
    const marinadeState = await marinade.getMarinadeState();
    const { state } = marinadeState;
    const totalSupply = state.msolSupply;
    const truePrice = state.msolPrice.toNumber() / 0x1_0000_0000;
    const totalStaked = totalSupply * truePrice;
    const totalStakedUsd = (totalStaked / 10 ** 9) * solPrice;
    return { totalStaked, totalStakedUsd, truePrice };
  } catch (error) {
    console.log("getMarinade", error);
    return {
      totalStaked: 0,
      totalStakedUsd: 0,
      truePrice: 0,
    };
  }
};

/* =================================================================
    Using This Functions Getting Marinade Validators Info
==================================================================== */

const getMarinadeValidatorsInfo = async () => {
  try {
    const validatorInfoArray = await getMarinadeStakeingPrice();
    let totalActiveStakeLamports = 0;
    for (let i = 0; i < validatorInfoArray.length; i++) {
      totalActiveStakeLamports += validatorInfoArray[i].current_stake;
    }
    return { validatorInfoArray, totalActiveStakeLamports };
  } catch (error) {
    console.log("getMarinadeValidatorsInfo", error);
    return {
      validatorInfoArray: [],
      totalActiveStakeLamports: 0,
    };
  }
};

module.exports = { getMarinadeValidatorsInfo, getMarinade };
