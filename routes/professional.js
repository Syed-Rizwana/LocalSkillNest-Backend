const express = require('express');
const router = express.Router();
const Professional = require('../models/Professional');

// GET all professionals
// Get all professionals
router.get('/professionals', async (req, res) => {
  try {
    const professionals = await Professional.find();
    res.json(professionals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept a professional by ID
router.patch('/professionals/accept/:id', async (req, res) => {
  try {
    const professional = await Professional.findById(req.params.id);
    if (!professional) {
      return res.status(404).json({ error: "Professional not found" });
    }

    // Prevent re-updating if already accepted or rejected
    if (professional.status === "accepted" || professional.status === "rejected") {
      return res.status(400).json({ error: "Status already set and cannot be changed" });
    }

    // Proceed to update
    professional.status = "accepted";
    const updated = await professional.save();

    res.json({ message: "Status updated to accepted", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject a professional by ID
router.patch('/professionals/reject/:id', async (req, res) => {
  try {
    const professional = await Professional.findById(req.params.id);
    if (!professional) {
      return res.status(404).json({ error: "Professional not found" });
    }

    // Prevent re-updating if already accepted or rejected
    if (professional.status === "accepted" || professional.status === "rejected") {
      return res.status(400).json({ error: "Status already set and cannot be changed" });
    }

    // Proceed to update
    professional.status = "rejected";
    const updated = await professional.save();

    res.json({ message: "Status updated to rejected", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;

