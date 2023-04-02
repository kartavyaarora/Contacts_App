const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const userdata=await User.findOne({email});
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
    const number=userdata.number;
    const name=userdata.name;
    res.status(200).json({number,name,email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {name,number,email, password} = req.body

  try {
    const user = await User.signup(name,number,email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({name,number,email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }