require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || process.argv[2];
if (!uri) {
  console.error('MONGO_URI not set. Provide it in .env or pass as first arg.');
  process.exit(1);
}

console.log('Testing Mongo URI:', uri.replace(/(:).+(@)/, '$1*****$2'));

(async () => {
  try {
    const conn = await mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to DB name:', conn.name);
    const cols = await conn.db.listCollections().toArray();
    console.log('Collections:', cols.map(c => c.name));
    await conn.close();
    process.exit(0);
  } catch (err) {
    console.error('Connection error:', err.message);
    process.exit(1);
  }
})();
