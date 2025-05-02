const mongoose = require('mongoose');

const acceptedProfessionalSchema = new mongoose.Schema({
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
  status: { type: String, default: "accepted" }
}, { collection: 'acceptedprofessionals' });

module.exports = mongoose.model('AcceptedProfessional', acceptedProfessionalSchema);

