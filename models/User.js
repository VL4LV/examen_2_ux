const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUID: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
