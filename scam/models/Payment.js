const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    method: {
      type: String,
      enum: ['cod', 'bank_transfer', 'momo', 'zalopay', 'vnpay', 'credit_card'],
      required: true,
    },
    // Mã giao dịch từ cổng thanh toán
    transaction_id: {
      type: String,
      trim: true,
      default: null,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'success', 'failed', 'refunded', 'partial_refund'],
      default: 'pending',
    },
    // Hỗ trợ hoàn tiền
    refund_amount: {
      type: Number,
      default: 0,
      min: 0,
    },
    refund_reason: {
      type: String,
      trim: true,
      default: '',
    },
    refunded_at: {
      type: Date,
      default: null,
    },
    paid_at: {
      type: Date,
      default: null,
    },
    // Metadata từ cổng thanh toán
    gateway_response: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

paymentSchema.index({ order_id: 1 });
paymentSchema.index({ transaction_id: 1 });
paymentSchema.index({ status: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
