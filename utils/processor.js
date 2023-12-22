const {
  getStakePoolValidatorsInfo,
  getMarinadeValidatorsInfo,
  getLidoValidatorsInfo,
} = require("../resources");

/* =================================================================
  Created Calculate Stake Pool Score
==================================================================== */

const calculateStakePoolScore = async (stakePoolPubkey, connection) => {
  try {
    let score = 0;
    const { validatorInfoArray, totalActiveStakeLamports } =
      await getStakePoolValidatorsInfo(stakePoolPubkey, connection);

    for (let i = 0; i < validatorInfoArray.length; i++) {
      const activeStakeLamports = validatorInfoArray[i].activeStakeLamports;
      score +=
        activeStakeLamports / (totalActiveStakeLamports - activeStakeLamports);
    }
    return (1 / score) * 100;
  } catch (error) {
    console.log("calculateStakePoolScore", error);
    return 0;
  }
};

/* =================================================================
  Created Calculate Marinade Score
==================================================================== */

const calculateMarinadeScore = async () => {
  try {
    let score = 0;

    const { validatorInfoArray, totalActiveStakeLamports } =
      await getMarinadeValidatorsInfo();

    for (let i = 0; i < validatorInfoArray.length; i++) {
      const activeStakeLamports = validatorInfoArray[i].current_stake;
      score +=
        activeStakeLamports / (totalActiveStakeLamports - activeStakeLamports);
    }
    return (1 / score) * 100;
  } catch (error) {
    console.log("calculateMarinadeScore", error);
    return 0;
  }
};

/* =================================================================
  Created Calculate Lido Score
==================================================================== */

const calculateLidoScore = async (connection) => {
  try {
    let score = 0;
    const { validatorInfoArray, totalActiveStakeLamports } =
      await getLidoValidatorsInfo(connection);
    for (let i = 0; i < validatorInfoArray.length; i++) {
      const activeStakeLamports = validatorInfoArray[i].account.lamports;
      score +=
        activeStakeLamports / (totalActiveStakeLamports - activeStakeLamports);
    }
    return (1 / score) * 100;
  } catch (error) {
    console.log("calculateLidoScore", error);
    return 0;
  }
};

module.exports = {
  calculateStakePoolScore,
  calculateMarinadeScore,
  calculateLidoScore,
};
