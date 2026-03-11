const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    provider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShippingProvider',
      default: null,
    },
    // Mã vận đơn
    tracking_number: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'picked_up',
        'in_transit',
        'out_for_delivery',
        'delivered',
        'failed',
        'returned',
      ],
      default: 'pending',
    },
    // Phí vận chuyển
    shipping_fee: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Trọng lượng kiện hàng (gram)
    weight: {
      type: Number,
      default: 0,
    },
    // Ngày dự kiến giao
    estimated_delivery: {
      type: Date,
      default: null,
    },
    delivered_at: {
      type: Date,
      default: null,
    },
    // ★ Mảng lịch sử theo dõi giao hàng (theo ghi chú thiết kế)
    tracking_events: [
      {
        status: { type: String, required: true },
        location: { type: String, default: '' },
        description: { type: String, default: '' },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

shipmentSchema.index({ order_id: 1 });
shipmentSchema.index({ tracking_number: 1 });
shipmentSchema.index({ status: 1 });

module.exports = mongoose.model('Shipment', shipmentSchema);
