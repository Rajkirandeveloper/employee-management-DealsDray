const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');


// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user with hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({ message: 'User registered successfully' });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const login= async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required.' });
//   }

//   try {
//     const user = await User.findOne({ username });
//     console.log('user',user)
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid username or password.' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log('user',isMatch)
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid username or password.' });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token, user: { username: user.username } });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error.' });
//   }
// };

const login = async (req, res) => {
  console.log('coming here .................')
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log(user,"user============================")

    if (!user) {
      return res.status(401).json({ error: 'user not exist'  });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch,"isMatch")
    if (!isMatch) {
      return res.status(400).json({ error: 'Password Not Matched' });
    }

    // Generate JWT (if needed) and save the username to session storage
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log(token,"token")

    

    return res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


// const login = async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       // Find the user by username
//       const user = await User.findOne({ username });
  
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//       }
  
//       // Compare password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//          res.status(400).json({ message: 'Invalid credentials' });
//       }
  
//       // If credentials are valid, respond with a success message
//       res.json({
//         message: 'Login successful',
//         user: { id: user._id, username: user.username, email: user.email },
       
//       });
//     } catch (err) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   };
  
  module.exports = {
    registerUser,
    login,
  };
  