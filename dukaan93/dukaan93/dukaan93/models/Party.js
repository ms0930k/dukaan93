const mongoose = require('mongoose');

const PartySchema = new mongoose.Schema({
  firm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Firm',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['customer', 'supplier', 'both'],
    required: true
  },
  gstin: {
    type: String
  },
  pan: {
    type: String
  },
  contactPerson: {
    name: String,
    phone: String,
    email: String
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
  openingBalance: {
    amount: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      enum: ['credit', 'debit'],
      default: 'credit'
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  currentBalance: {
    type: Number,
    default: 0
  },
  creditLimit: {
    type: Number,
    default: 0
  },
  paymentTerms: {
    type: String
  },
  notes: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Party', PartySchema);