/* =================================================================
  Created MongoDB Configrations and Secure Private Variables 
==================================================================== */

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME;
const MONGODB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@stake-sol-api.5iszpyt.mongodb.net/${MONGODB_COLLECTION_NAME}`;

/* =================================================================
  Demo Configrations for local
==================================================================== */

// const MONGODB_URL = 'mongodb+srv://demo:VlSyaHvrPwe4Rxle@cluster0.cdo07gt.mongodb.net/demo';

/* =================================================================
  Created Contract Configrations
==================================================================== */

const RPC_ENDPOINT = process.env.RPC_ENDPOINT;
const CLUSTER_NAME = 'mainnet-beta';

/* =================================================================
  Created Cors Policy To Protect Apis And Give Access to Intgrated
==================================================================== */

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3000/*',
  'https://www.stakesol.app',
  'https://www.stakesol.app/*',
];

const CORS_OPTIONS = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

/* =================================================================
  Define and Export Global Configrations
==================================================================== */

const PORT = process.env.PORT;

module.exports = {
  MONGODB_URL,
  PORT,
  CORS_OPTIONS,
  RPC_ENDPOINT,
  CLUSTER_NAME,
};
