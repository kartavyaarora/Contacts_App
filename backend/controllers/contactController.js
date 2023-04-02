const Contact = require('../models/contactModel')
const mongoose = require('mongoose')

// get all contact
const getContacts = async (req, res) => {
  const user_id = req.user._id

  const contact = await Contact.find({user_id}).sort({createdAt: -1})

  res.status(200).json(contact)
}

// get a single contact
const getContact = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Contact'})
  }

  const contact = await Contact.findById(id)

  if (!contact) {
    return res.status(404).json({error: 'No such contact'})
  }

  res.status(200).json(contact)
}


// create a new contact
const createContact = async (req, res) => {
  const {name,number,email,address} = req.body

  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (!number) {
    emptyFields.push('number')
  }
  if (!email) {
    emptyFields.push('email')
  }
  if (!address) {
    emptyFields.push('address')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const user_id = req.user._id
    const contact = await Contact.create({ name,number,email,address, user_id })
    res.status(200).json(contact)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a contact
const deleteContact = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such contact'})
  }

  const contact = await Contact.findOneAndDelete({_id: id})

  if(!contact) {
    return res.status(400).json({error: 'No such contact'})
  }

  res.status(200).json(contact)
}

// update a contact
const updateContact = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such contact'})
  }

  const contact = await Contact.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!contact) {
    return res.status(400).json({error: 'No such contact'})
  }

  res.status(200).json(contact)
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact
}