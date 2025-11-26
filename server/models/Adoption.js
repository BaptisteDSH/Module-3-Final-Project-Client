const mongoose = require("mongoose");

// Example Adoption model for the backend
const adoptionSchema = new mongoose.Schema(
  {
    pet: {
      name: { type: String },
      type: { type: String },
      description: { type: String },
    },
    pictures: [{ type: String }],
    location: { type: String },
    datePosted: { type: Date, default: Date.now },
    // Reference to the User who created the adoption listing
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Adoption", adoptionSchema);
