const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    type: String,
    data: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Crypto', cryptoSchema);
