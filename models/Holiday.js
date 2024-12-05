const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // yyyy-MM-dd
  type: { type: String, enum: ['local', 'state', 'autonomic'], required: true },
});

const Holiday = mongoose.model('Holiday', holidaySchema);

module.exports = Holiday;
