const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },

    // ★ SNAPSHOT sản phẩm – copy cứng, KHÔNG dùng ref (theo ghi chú thiết kế)
    // Lưu lại tên, SKU, giá – không bị thay đổi khi sản phẩm cập nhật sau này
    product_snapshot: {
      product_id: { type: mongoose.Schema.Types.ObjectId }, // Lưu ID để tham chiếu nếu cần
      variant_id: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String, required: true },
      sku: { type: String, required: true },
      image: { type: String, default: null },
      // Thuộc tính biến thể tại thời điểm mua
      attributes: { type: Map, of: String, default: {} },
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    // Tổng = price * quantity
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

orderItemSchema.index({ order_id: 1 });

module.exports = mongoose.model('OrderItem', orderItemSchema);
