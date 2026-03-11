const mongoose = require('mongoose');

const orderVoucherSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    voucher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voucher',
      required: true,
    },
    // Số tiền giảm thực tế từ voucher này
    discount_amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

// Hỗ trợ dùng nhiều voucher cùng lúc cho 1 đơn
orderVoucherSchema.index({ order_id: 1 });
orderVoucherSchema.index({ order_id: 1, voucher_id: 1 }, { unique: true });

module.exports = mongoose.model('OrderVoucher', orderVoucherSchema);
