const { StakeProgram } = require("@solana/web3.js");

const StakeModel = require("../models/lst.model");
const { getSolPrice } = require("./token-prices");

const getTotalStakedSol = async (connection) => {
  try {
    console.log("getTotalStakedSol start");
    const stakeAccounts = await connection.getProgramAccounts(
      StakeProgram.programId
    );

    console.log("stakeAccounts length", stakeAccounts.length);

    const totalStaked = stakeAccounts.reduce((acc, value) => {
      return (acc += value.account.lamports);
    }, 0);
    console.log(totalStaked);

    return totalStaked;
  } catch (error) {
    console.log("getTotalStakedSol error", error);
    return 0;
  }
};

const getTotalLstSol = async () => {
  try {
    const lstData = await StakeModel.find();
    if (!lstData || lstData.length === 0) return 0;

    let totalLst = 0;

    lstData.forEach((element) => {
      totalLst += element.totalStaked;
    });
    return totalLst;
  } catch (error) {
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
    return {
      totalStaked: 0,
      totalStakedUsd: 0,
      totalLst: 0,
      totalLstUsd: 0,
    };
  }
};

module.exports = { StakingdApi };
