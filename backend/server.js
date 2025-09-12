const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')


dotenv.config()


// Connecting to the MongoDB Client
const url = process.env.MONGO_URI;
const client = new MongoClient(url);



client.connect().then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB connection failed:", err);
});



// App & Database
const dbName = process.env.DB_NAME;
const app = express()
const port = process.env.PORT || 5000; // Use uppercase and provide a default

// Middleware
app.use(express.json());
app.use(bodyparser.json());
app.use(cors());


// Get all the passwords
app.get('/', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  } catch (err) {
    console.error('GET / error:', err);
    res.status(500).send({ error: 'Failed to fetch passwords' });
  }
});

// Save a password
app.post('/', async (req, res) => {
  try {
    console.log("Incoming body:", req.body); 
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const result = await collection.insertOne(req.body);
    console.log("Inserted:", result.insertedId);
    res.status(200).json({ success: true, insertedId: result.insertedId });
    console.log("Received body:", req.body);
  } catch (err) {
    console.error("POST / error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Delete a password by id
app.delete('/', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const result = await collection.deleteOne({ id: req.body.id });
    console.log("Deleted:", req.body);
    res.send({ success: true, result });
  } catch (err) {
    console.error("DELETE / error:", err);
    res.status(500).json({ error: "Failed to delete password" });
  }
});


// Edit/Update a password by id
app.put('/', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    const { id, site, username, password } = req.body;
    if (!id) return res.status(400).json({ error: "Missing ID for update" });

    const result = await collection.updateOne(
      { id }, // Match by custom UUID
      { $set: { site, username, password } }
    );

    console.log("Updated:", result.modifiedCount);
    res.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (err) {
    console.error("PUT / error:", err);
    res.status(500).json({ error: "Failed to update password" });
  }
});



app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`)
})
