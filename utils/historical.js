const { getSolPrice } = require('./token-prices');
const { stakePoolMap } = require('../constants/global');
const { getStakePool, getMarinade, getLido } = require('../resources');
const {
  calculateStakePoolScore,
  calculateMarinadeScore,
  calculateLidoScore,
} = require('./processor');
const { getApy } = require('./apy-utils');

const lstApi = async (timestamp, connection) => {
  try {
    const solPrice = await getSolPrice();

    let collectList = [];

    const stakePoolList = Object.values(stakePoolMap);
    const stakePoolSymbolList = Object.keys(stakePoolMap);

    for (let i = 0; i < stakePoolList.length; i++) {
      const stakePoolPubkey = stakePoolList[i];

      const stakePoolInfo = await getStakePool(stakePoolPubkey, solPrice, connection);
      stakePoolInfo['symbol'] = stakePoolSymbolList[i];
      stakePoolInfo['score'] = await calculateStakePoolScore(stakePoolPubkey, connection);
      stakePoolInfo['apy'] = await getApy(stakePoolSymbolList[i]);
      stakePoolInfo['timestamp'] = timestamp;
      collectList.push(stakePoolInfo);
    }

    const marinadeInfo = await getMarinade(solPrice, connection);
    marinadeInfo['symbol'] = 'mSOL';
    marinadeInfo['score'] = await calculateMarinadeScore();
    marinadeInfo['apy'] = await getApy('mSOL');
    marinadeInfo['timestamp'] = timestamp;
    collectList.push(marinadeInfo);

    const lidoInfo = await getLido(solPrice, connection);
    lidoInfo['symbol'] = 'stSOL';
    lidoInfo['score'] = await calculateLidoScore(connection);
    lidoInfo['apy'] = await getApy('stSOL');
    lidoInfo['timestamp'] = timestamp;
    collectList.push(lidoInfo);

    return collectList;
  } catch (error) {
    return [];
  }
};

module.exports = { lstApi };
