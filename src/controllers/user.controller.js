const jwt  = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const exists = await User.findOne({ $or:[{email},{username}] });
    if (exists) return res.status(409).json({ status:false, message:'User already exists' });

    const u = await User.create({ username, email, password });
    res.status(201).json({ message:'User created successfully.', user_id: String(u._id) });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne(email ? { email } : { username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ status:false, message:'Invalid Username and password' });
    }
    const out = { message:'Login successful.' };
    if (process.env.JWT_SECRET) {
      out.jwt_token = jwt.sign({ sub:user._id, username:user.username }, process.env.JWT_SECRET, { expiresIn:'2h' });
    }
    res.status(200).json(out);
  } catch (e) { next(e); }
};

