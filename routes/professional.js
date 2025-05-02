const express = require('express');
const router = express.Router();
const Professional = require('../models/Professional');
const AcceptedProfessional = require('../models/AcceptedProfessional');

// GET all professionals
router.get('/professionals', async (req, res) => {
  try {
    const professionals = await Professional.find();
    res.json(professionals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REJECT a professional by ID
router.patch('/professionals/reject/:id', async (req, res) => {
  try {
    const professional = await Professional.findById(req.params.id);
    if (!professional) {
      return res.status(404).json({ error: "Professional not found" });
    }

    if (professional.status === "accepted" || professional.status === "rejected") {
      return res.status(400).json({ error: "Status already set and cannot be changed" });
    }

    professional.status = "rejected";
    const updated = await professional.save();

    res.json({ message: "Status updated to rejected", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ACCEPT and MOVE a professional by ID
router.put('/professionals/accept/:id', async (req, res) => {
  try {
    const professional = await Professional.findById(req.params.id);
    if (!professional) {
      return res.status(404).json({ error: 'Professional not found' });
    }

    if (professional.status === 'accepted' || professional.status === 'rejected') {
      return res.status(400).json({ error: 'Status already set and cannot be changed' });
    }

    const acceptedData = {
      ...professional.toObject(),
      status: 'accepted'
    };
    delete acceptedData._id;

    await AcceptedProfessional.create(acceptedData);
    await Professional.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: 'Professional moved to accepted collection' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

