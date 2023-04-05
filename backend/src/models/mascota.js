const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
  animal: {
    type: String
  },
  size: {
    type: String
  },
  breed: {
    type: String
  },
  name: {
    type: String,
    required: false
  },
  note: {
    type: String,
    required: false
  },
  date: {
    type: Date
  },
  important: {
    type: Boolean
  },
  inAdoption: {
    type: String
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Pet = mongoose.model('Mascota', petSchema, 'mascotas')

module.exports = { Pet }
