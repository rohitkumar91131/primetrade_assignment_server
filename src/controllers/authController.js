const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000 
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'USER'
    });

    const idToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const roleToken = jwt.sign({ role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('user_token', idToken, cookieOptions);
    res.cookie('role_token', roleToken, cookieOptions);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      
      const idToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      const roleToken = jwt.sign({ role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

      res.cookie('user_token', idToken, cookieOptions);
      res.cookie('role_token', roleToken, cookieOptions);

      res.json({
        _id: user._id,
        name: user.name,
        role: user.role
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  res.cookie('user_token', '', { ...cookieOptions, expires: new Date(0) });
  res.cookie('role_token', '', { ...cookieOptions, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out' });
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};