const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Now MongoDB will enforce that this field exists
  },
  id: { type: String, unique: true }, // UUID from frontend
  site: String,
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Password', passwordSchema);