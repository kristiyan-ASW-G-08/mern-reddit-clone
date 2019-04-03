const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} =  require('../config/keys')
const User = require('../models/user');
const errorsIsEmpty = require('../util/errorsIsEmpty')
exports.signup = async (req, res, next) => {
  try {
    errorsIsEmpty(validationResult(req))
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      username
    });
    await user.save();
    res.status(200).json({ message: 'User created!', userId: user._id });
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
    const user = await User.findOne({ email })
    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.data = [{location: "body", param: "email", value:email, msg: 'A user with this email could not be found.',authError:true}]
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      const error = new Error('Wrong password!');
      error.data = [{location: "body", param: "password", value:password, msg: "password dosnt match",authError:true}]
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
    const {
      username,
      cakeDay,
      karma,
      communities,
      comments,
      saved,
      upvoted,
      downvoted,
      posts,
    } = user

    
    const userData = {
      email,
      username,
      cakeDay,
      karma,
      communities,
      comments,
      saved,
      upvoted,
      downvoted,
      posts,
    }
    res.status(200).json({ token: token, userId: loadedUser._id.toString(),userData });
  } catch (err) {
    console.log(err)
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
