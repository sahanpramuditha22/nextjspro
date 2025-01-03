// pages/api/auth/saveCredentials.js

import { connectToDatabase } from "../../../lib/mongodb";  // Import the connectToDatabase function
import User from "../../../models/user";  // Import your User model

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();  // Connect to MongoDB

    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Save the new user to the database
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "User credentials stored successfully." });
  } catch (error) {
    console.error("Error saving credentials:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
