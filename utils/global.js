const { Connection, PublicKey } = require('@solana/web3.js');

const { RPC_ENDPOINT } = require('../config');

/* =================================================================
  Created  Connection Function To Intregrate SDK
==================================================================== */
const getConnection = async () => {
  return new Connection(RPC_ENDPOINT, 'processed');
};

/* =================================================================
  Creating PublicKey
==================================================================== */

const getPublicKey = (key) => {
  return new PublicKey(key);
};

module.exports = { getConnection, getPublicKey };
