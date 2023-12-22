const stakePool = require("@solana/spl-stake-pool");

const { getPublicKey } = require("../utils/global");

/* =================================================================
      Using Stake SDK to Fetch Stake Pool Info
==================================================================== */

const getStakePool = async (key, solPrice, connection) => {
  try {
    const publickey = getPublicKey(key);
    const stakePoolInfo = await stakePool.stakePoolInfo(connection, publickey);
    const getTotalLamportsaked = stakePoolInfo.totalLamports;
    const totalStaked = parseInt(getTotalLamportsaked, 10);
    const truePrice =
      stakePoolInfo.totalLamports / stakePoolInfo.poolTokenSupply;
    const totalStakedUsd = (totalStaked / 10 ** 9) * solPrice;
    return { totalStaked, totalStakedUsd, truePrice };
  } catch (error) {
    console.log("getStakePool", error);
    return {
      totalStaked: 0,
      totalStakedUsd: 0,
      truePrice: 0,
    };
  }
};

/* =================================================================
    Getting Stake Pool Validators Info
==================================================================== */

const getStakePoolValidatorsInfo = async (key, connection) => {
  try {
    const publickey = getPublicKey(key);
    const stakePoolInfo = await stakePool.stakePoolInfo(connection, publickey);
    const validatorInfoArray = stakePoolInfo.validatorList;
    let totalActiveStakeLamports = 0;
    for (let i = 0; i < validatorInfoArray.length; i++) {
      totalActiveStakeLamports += parseInt(
        validatorInfoArray[i].activeStakeLamports
      );
    }
    return { validatorInfoArray, totalActiveStakeLamports };
  } catch (error) {
    console.log("getStakePoolValidatorsInfo", error);
    return {
      validatorInfoArray: [],
      totalActiveStakeLamports: 0,
    };
  }
};

module.exports = { getStakePool, getStakePoolValidatorsInfo };
