const express = require("express");
const Adoption = require("../models/Adoption");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

// Create - POST /api/adoptions
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    // Owner is taken from the authenticated token payload
    const newAdoption = await Adoption.create({
      ...req.body,
      owner: req.user?.id,
    });
    res.status(201).json(newAdoption);
  } catch (err) {
    next(err);
  }
});

// Read all - GET /api/adoptions
router.get("/", async (req, res, next) => {
  try {
    const all = await Adoption.find().populate("owner", "name email");
    res.json(all);
  } catch (err) {
    next(err);
  }
});

// Read one - GET /api/adoptions/:id
router.get("/:id", async (req, res, next) => {
  try {
    const item = await Adoption.findById(req.params.id).populate("owner");
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// Update - PATCH /api/adoptions/:id
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const updated = await Adoption.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete - DELETE /api/adoptions/:id
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    await Adoption.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
