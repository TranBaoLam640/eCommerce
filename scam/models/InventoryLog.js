const mongoose = require('mongoose');

const inventoryLogSchema = new mongoose.Schema(
  {
    variant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductVariant',
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    // Loại thao tác: nhập kho, xuất kho, điều chỉnh, trả hàng...
    type: {
      type: String,
      enum: ['import', 'export', 'adjustment', 'return', 'cancel'],
      required: true,
    },
    // Số lượng thay đổi (dương = nhập, âm = xuất)
    quantity_change: {
      type: Number,
      required: true,
    },
    // Tồn kho sau thao tác
    stock_after: {
      type: Number,
      required: true,
    },
    // ★ Người thực hiện hành động (theo ghi chú thiết kế)
    performed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // ★ Lý do thao tác (theo ghi chú thiết kế)
    reason: {
      type: String,
      trim: true,
      default: '',
    },
    // Tham chiếu đơn hàng nếu liên quan
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      default: null,
    },
  },
  { timestamps: true }
);

inventoryLogSchema.index({ variant_id: 1 });
inventoryLogSchema.index({ product_id: 1 });
inventoryLogSchema.index({ performed_by: 1 });
inventoryLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('InventoryLog', inventoryLogSchema);
