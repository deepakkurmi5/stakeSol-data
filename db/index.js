const mongoose = require('mongoose');

const { MONGODB_URL } = require('../config');

mongoose.set('strictQuery', false);

const connection = {};

/* =================================================
   Created Database Connect Function
================================================= */

async function connect() {
  if (connection.isConnected) {
    console.log('already connected to DB');
    return;
  }

  if (mongoose.connections.length > 0) {
    connect.isConnected = mongoose.connections[0].readyState;

    if (connection.isConnected === 1) {
      console.log('use previous connection DB');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('new DB connection ');
  connection.isConnected = db.connections[0].readyState;
}

/* =================================================
   Created Database Disconnect Function
================================================= */

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not diconnected DB');
    }
  }
}

const Database = { connect, disconnect };
module.exports = Database;
