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

    validatorInfoArray.forEach((element) => {
      const activeStakeLamports = element.activeStakeLamports;
      score +=
        activeStakeLamports / (totalActiveStakeLamports - activeStakeLamports);
    });

    return (1 / score) * 100;
  } catch (error) {
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

    validatorInfoArray.forEach((element) => {
      const activeStakeLamports = element.current_stake;
      score +=
        activeStakeLamports / (totalActiveStakeLamports - activeStakeLamports);
    });
    return (1 / score) * 100;
  } catch (error) {
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

    validatorInfoArray.forEach((element) => {
      const activeStakeLamports = element.account.lamports;
      score +=
        activeStakeLamports / (totalActiveStakeLamports - activeStakeLamports);
    });

    return (1 / score) * 100;
  } catch (error) {
    return 0;
  }
};

module.exports = {
  calculateStakePoolScore,
  calculateMarinadeScore,
  calculateLidoScore,
};
