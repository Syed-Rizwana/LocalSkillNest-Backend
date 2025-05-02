const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  email: String,
  aadharNumber: String,
  aadharImage: String,
  profileImage: String,
  bannerImage: String,
  state: String,
  district: String,
  city: String,
  category: String,
  services: [String],
  status: { type: String, default: "pending" }
}, { collection: 'professionals' });

module.exports = mongoose.model('Professional', professionalSchema);

