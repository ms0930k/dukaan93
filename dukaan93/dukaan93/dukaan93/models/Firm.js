const mongoose = require('mongoose');

const FirmSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  gstin: {
    type: String
  },
  pan: {
    type: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  contactPerson: {
    name: String,
    phone: String,
    email: String
  },
  financialYear: {
    start: Date,
    end: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Firm', FirmSchema);