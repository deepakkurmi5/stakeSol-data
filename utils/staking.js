const { StakeProgram } = require("@solana/web3.js");

const StakeModel = require("../models/lst.model");
const { getSolPrice } = require("./token-prices");

const getTotalStakedSol = async (connection) => {
  try {
    const stakeAccounts = await connection.getProgramAccounts(
      StakeProgram.programId
    );
    let totalStaked = 0;
    for (let i = 0; i < stakeAccounts?.length; i++) {
      totalStaked += stakeAccounts[i].account.lamports;
    }
    return totalStaked;
  } catch (error) {
    console.log("getTotalStakedSol", error);
    return 0;
  }
};

const getTotalLstSol = async () => {
  try {
    const lstData = await StakeModel.find();
    if (!lstData || lstData.length === 0) return 0;
    let totalLst = 0;
    for (let i = 0; i < lstData?.length; i++) {
      totalLst += lstData[i].totalStaked;
    }
    return totalLst;
  } catch (error) {
    console.log("getTotalLstSol", error);
    return 0;
  }
};

const StakingdApi = async (connection) => {
  try {
    const solPrice = await getSolPrice();

    const totalStaked = await getTotalStakedSol(connection);
    const totalLst = await getTotalLstSol();
    const totalStakedUsd = (totalStaked / 10 ** 9) * solPrice;
    const totalLstUsd = (totalLst / 10 ** 9) * solPrice;

    return { totalStaked, totalStakedUsd, totalLst, totalLstUsd };
  } catch (error) {
    console.log("StakingdApi", error);
    return {
      totalStaked: 0,
      totalStakedUsd: 0,
      totalLst: 0,
      totalLstUsd: 0,
    };
  }
};

module.exports = { StakingdApi };
