const { getLido, getLidoValidatorsInfo } = require("./lido-parse");
const { getMarinade, getMarinadeValidatorsInfo } = require("./marinade-parse");
const {
  getStakePool,
  getStakePoolValidatorsInfo,
} = require("./stake-pool-parse");

module.exports = {
  getLido,
  getMarinade,
  getMarinadeValidatorsInfo,
  getStakePool,
  getStakePoolValidatorsInfo,
  getLidoValidatorsInfo,
};
