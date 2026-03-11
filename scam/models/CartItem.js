const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    variant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductVariant',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    // Giá tại thời điểm thêm vào giỏ
    price_at_added: {
      type: Number,
      required: true,
      min: 0,
    },
    // "Lưu để mua sau"
    saved_for_later: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

cartItemSchema.index({ cart_id: 1 });
cartItemSchema.index({ cart_id: 1, variant_id: 1 }, { unique: true });

module.exports = mongoose.model('CartItem', cartItemSchema);
