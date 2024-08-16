const User = require('../models/User');

// User Signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user
    const user = new User({ username, email, password });
    
    // Save the user to the database
    await user.save();
    
    // Generate a JWT token
    const token = user.generateAuthToken();
    
    // Respond with the token
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    
    // Check if user exists and password matches
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = user.generateAuthToken();
    
    // Respond with the token
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
