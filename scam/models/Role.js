const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ['admin', 'seller', 'customer', 'staff', 'shipper'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Role', roleSchema);
