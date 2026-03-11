const mongoose = require('mongoose');

const orderStatusLogSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    from_status: {
      type: String,
      trim: true,
      default: null, // null khi tạo đơn mới
    },
    to_status: {
      type: String,
      required: true,
      trim: true,
    },
    // ★ Người thực hiện hành động (theo ghi chú thiết kế)
    performed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // ★ Lý do thay đổi trạng thái (theo ghi chú thiết kế)
    reason: {
      type: String,
      trim: true,
      default: '',
    },
    note: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

orderStatusLogSchema.index({ order_id: 1 });
orderStatusLogSchema.index({ performed_by: 1 });
orderStatusLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('OrderStatusLog', orderStatusLogSchema);
