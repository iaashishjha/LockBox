const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  cachedClient = client;
  return client;
}

module.exports = async (req, res) => {
  // --- CORS headers ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // --- Handle preflight OPTIONS request ---
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    if (req.method === 'GET') {
      const findResult = await collection.find({}).toArray();
      res.status(200).json(findResult);
    } else if (req.method === 'POST') {
      const result = await collection.insertOne(req.body);
      res.status(200).json({ success: true, insertedId: result.insertedId });
    } else if (req.method === 'DELETE') {
      const result = await collection.deleteOne({ id: req.body.id });
      res.status(200).json({ success: true, result });
    } else if (req.method === 'PUT') {
      const { id, site, username, password } = req.body;
      if (!id) return res.status(400).json({ error: "Missing ID for update" });
      const result = await collection.updateOne(
        { id },
        { $set: { site, username, password } }
      );
      res.status(200).json({ success: true, modifiedCount: result.modifiedCount });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};