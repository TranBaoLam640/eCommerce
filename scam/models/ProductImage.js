const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    // Nếu ảnh thuộc biến thể cụ thể
    variant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductVariant',
      default: null,
    },
    url: {
      type: String,
      required: true,
    },
    alt_text: {
      type: String,
      trim: true,
      default: '',
    },
    is_primary: {
      type: Boolean,
      default: false,
    },
    sort_order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productImageSchema.index({ product_id: 1 });
productImageSchema.index({ variant_id: 1 });

module.exports = mongoose.model('ProductImage', productImageSchema);
