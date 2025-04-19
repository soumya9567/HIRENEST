// controllers/userController.js
import User from '../models/User.js';

const storeUserData = async (req, res) => {
  try {
    const { clerkId, name, email, image, role } = req.body;

    if (!clerkId || !email || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ clerkId });

    if (existingUser) {
      return res.status(200).json({ message: 'User already exists', user: existingUser });
    }

    // Create new user
    const newUser = new User({
      clerkId,
      name,
      email,
      image,
      role: role || 'candidate', // default fallback
    });

    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error(' Error storing user:', error);
    res.status(500).json({ error: 'Error saving user to database' });
  }
};

export { storeUserData };
