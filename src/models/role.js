const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [String], // e.g., ["read:user", "write:course"]
});

module.exports = mongoose.model('Role', roleSchema);
