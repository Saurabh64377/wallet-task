const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bank: { type: String, required: true },
  amount: { type: Number, required: true },
  time: { type: String, required: true },
  type: { type: String, required: true }, 
  date: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Wallet", walletSchema);
