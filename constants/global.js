const {
  bSOL,
  jitoSOL,
  JSOL,
  scnSOL,
  laineSOL,
  daoSOL,
  eSOL,
  cgntSOL,
  LST,
} = require('./public-key');

/* =================================================
  Stake Pool Map List
================================================= */

const stakePoolMap = {
  bSOL: bSOL,
  jitoSOL: jitoSOL,
  JSOL: JSOL,
  scnSOL: scnSOL,
  laineSOL: laineSOL,
  daoSOL: daoSOL,
  eSOL: eSOL,
  cgntSOL: cgntSOL,
  LST: LST,
};

module.exports = { stakePoolMap };
