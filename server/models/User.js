const mongoose = require("mongoose");

// Example User model for the backend
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    location: { type: String },
    age: { type: Number },
    description: { type: String },
    picture: { type: String },
    phone: { type: String },
    // One-to-many relationship: a user can have several adoptions/pets
    pet: [{ type: mongoose.Schema.Types.ObjectId, ref: "Adoption" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
