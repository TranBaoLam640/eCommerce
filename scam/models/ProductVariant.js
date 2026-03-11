const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    // Thuộc tính biến thể (VD: { color: 'Đỏ', size: 'XL' })
    attributes: {
      type: Map,
      of: String,
      default: {},
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    compare_at_price: {
      type: Number,
      default: null,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    // Trọng lượng (gram) – dùng tính phí vận chuyển
    weight: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productVariantSchema.index({ product_id: 1 });

module.exports = mongoose.model('ProductVariant', productVariantSchema);
