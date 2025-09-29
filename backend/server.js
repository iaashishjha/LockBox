const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const AuthRouter = require('./routes/AuthRouter');
const Password = require('./models/password');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();
require('./models/db');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', AuthRouter);

// ✅ Get all passwords for logged-in user
app.get('/', authMiddleware, async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.userId });
    res.json(passwords);
  } catch (err) {
    console.error('GET / error:', err);
    res.status(500).send({ error: 'Failed to fetch passwords' });
  }
});

// ✅ Save or update password
app.post('/', authMiddleware, async (req, res) => {
  try {
    const { id, site, username, password } = req.body;
    const existing = await Password.findOne({ id, userId: req.userId });

    if (existing) {
      existing.site = site;
      existing.username = username;
      existing.password = password;
      await existing.save();
      return res.json({ success: true, message: "Password updated" });
    }

    const newPassword = new Password({ userId: req.userId, id, site, username, password });
    await newPassword.save();
    res.status(200).json({ success: true, message: "Password saved" });
  } catch (err) {
    console.error("POST / error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Delete password
app.delete('/', authMiddleware, async (req, res) => {
  try {
    const result = await Password.findOneAndDelete({ id: req.body.id, userId: req.userId });
    res.send({ success: true, result });
  } catch (err) {
    console.error("DELETE / error:", err);
    res.status(500).json({ error: "Failed to delete password" });
  }
});

// ✅ Update password (alternative PUT route)
app.put('/', authMiddleware, async (req, res) => {
  try {
    const { id, site, username, password } = req.body;
    if (!id) return res.status(400).json({ error: "Missing ID for update" });

    const result = await Password.findOneAndUpdate(
      { id, userId: req.userId },
      { site, username, password },
      { new: true }
    );

    res.json({ success: true, result });
  } catch (err) {
    console.error("PUT / error:", err);
    res.status(500).json({ error: "Failed to update password" });
  }
});

module.exports = app;