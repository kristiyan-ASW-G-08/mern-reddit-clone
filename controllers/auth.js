const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} =  require('../config/keys')
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    console.log(req.body)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      username
    });
    await user.save();
    res.status(201).json({ message: 'User created!', userId: user._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let loadedUser;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.data = {location: "body", param: "email", value:email, msg: 'A user with this email could not be found.',authError:true}
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      const error = new Error('Wrong password!');
      error.data = {location: "body", param: "password", value:password, msg: "password dosnt match",authError:true}
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      },
      secret,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
// exports.getUserStatus = (req, res, next) => {
//   User.findById(req.userId)
//     .then(user => {
//       if (!user) {
//         const error = new Error('User not found.');
//         error.statusCode = 404;
//         throw error;
//       }
//       res.status(200).json({ status: user.status });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// exports.updateUserStatus = (req, res, next) => {
//   const newStatus = req.body.status;
//   User.findById(req.userId)
//     .then(user => {
//       if (!user) {
//         const error = new Error('User not found.');
//         error.statusCode = 404;
//         throw error;
//       }
//       user.status = newStatus;
//       return user.save();
//     })
//     .then(result => {
//       res.status(200).json({ message: 'User updated.' });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };
