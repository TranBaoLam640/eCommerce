const mongoose = require('mongoose');

const voucherAssignmentSchema = new mongoose.Schema(
  {
    voucher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voucher',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    is_used: {
      type: Boolean,
      default: false,
    },
    used_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Mỗi user chỉ được gán 1 lần cho mỗi voucher
voucherAssignmentSchema.index(
  { voucher_id: 1, user_id: 1 },
  { unique: true }
);

module.exports = mongoose.model('VoucherAssignment', voucherAssignmentSchema);
