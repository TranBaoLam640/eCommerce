const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    order_code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'processing',
        'shipping',
        'delivered',
        'completed',
        'cancelled',
        'refunded',
      ],
      default: 'pending',
    },

    // ★ SNAPSHOT địa chỉ giao hàng – copy cứng, KHÔNG dùng ref (theo ghi chú thiết kế)
    shipping_address: {
      receiver_name: { type: String, required: true },
      receiver_phone: { type: String, required: true },
      province: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String, required: true },
      street: { type: String, required: true },
    },

    // Tổng tiền
    subtotal: { type: Number, required: true, min: 0 },        // Tổng giá sản phẩm
    shipping_fee: { type: Number, default: 0, min: 0 },        // Phí vận chuyển
    discount_amount: { type: Number, default: 0, min: 0 },     // Tổng giảm giá
    total: { type: Number, required: true, min: 0 },           // Tổng thanh toán

    payment_method: {
      type: String,
      enum: ['cod', 'bank_transfer', 'momo', 'zalopay', 'vnpay', 'credit_card'],
      default: 'cod',
    },
    payment_status: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded', 'partial_refund'],
      default: 'unpaid',
    },

    note: { type: String, trim: true, default: '' },
    cancelled_reason: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

orderSchema.index({ user_id: 1 });
orderSchema.index({ store_id: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
