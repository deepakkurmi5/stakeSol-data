const { SolidoSDK } = require("@lidofinance/solido-sdk");
const { StakeProgram } = require("@solana/web3.js");

const { CLUSTER_NAME } = require("../config");
const { getPublicKey } = require("../utils/global");
const { lido_delegator_account } = require("../constants/public-key");

/* =================================================
    Created Functions To Get Data Using Lido SDK
================================================= */

const getLido = async (solPrice, connection) => {
  try {
    const solidoSdk = new SolidoSDK(CLUSTER_NAME, connection);
    const totalStaked = (await solidoSdk.getTotalStaked()) * 10 ** 9;
    const truePrice = (await solidoSdk.getExchangeRate()).stSOLToSOL;
    const totalStakedUsd = (totalStaked / 10 ** 9) * solPrice;
    return { totalStaked, totalStakedUsd, truePrice };
  } catch (error) {
    return { totalStaked: 0, totalStakedUsd: 0, truePrice: 0 };
  }
};

/* =================================================
    Created Functions To Get Lido Validators Info
================================================= */

const getLidoValidatorsInfo = async (connection) => {
  try {
    const LIDO_DELEGATOR_ACCOUNT = getPublicKey(lido_delegator_account);
    const validatorInfoArray = await connection.getProgramAccounts(
      StakeProgram.programId,
      {
        commitment: "confirmed",
        filters: [
          {
            memcmp: {
              offset: 44,
              bytes: LIDO_DELEGATOR_ACCOUNT.toBase58(),
            },
          },
        ],
      }
    );

    let totalActiveStakeLamports = 0;

    validatorInfoArray.forEach((element) => {
      totalActiveStakeLamports += element.account.lamports;
    });

    return { validatorInfoArray, totalActiveStakeLamports };
  } catch (error) {
    return {
      validatorInfoArray: [],
      totalActiveStakeLamports: 0,
    };
  }
};

module.exports = { getLido, getLidoValidatorsInfo };
