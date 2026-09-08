const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/homeease';

  try {
    console.log(`[Database] Checking MongoDB connection at ${uri}...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    global.useMemoryDB = false;
    console.log(`[Database] Connected successfully to MongoDB: ${mongoose.connection.host}`);
  } catch (err) {
    console.warn(`[Database] Standalone MongoDB daemon not found (${err.message}).`);
    console.log('[Database] Activating zero-download, high-speed In-Memory Datastore mode.');
    isConnected = true;
    global.useMemoryDB = true;
  }
};

const disconnectDB = async () => {
  if (!global.useMemoryDB) {
    await mongoose.disconnect();
  }
};

module.exports = { connectDB, disconnectDB, isConnected: () => isConnected };
