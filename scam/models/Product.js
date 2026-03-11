const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    // Giá gốc (base price) – giá chi tiết nằm ở product_variants
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    compare_at_price: {
      type: Number,
      default: null, // Giá niêm yết/ giá gạch ngang
      min: 0,
    },
    // ★ Mảng category_ids để query nhanh (theo ghi chú thiết kế)
    // Bảng product_categories là dữ liệu chính xác nhất
    category_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    brand: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'inactive', 'out_of_stock', 'deleted'],
      default: 'draft',
    },
    // Tổng tồn kho (tính từ tổng các variants)
    total_stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    sold_count: {
      type: Number,
      default: 0,
    },
    rating_avg: { type: Number, default: 0, min: 0, max: 5 },
    rating_count: { type: Number, default: 0 },
    // SEO & meta
    meta_title: { type: String, trim: true },
    meta_description: { type: String, trim: true },
  },
  { timestamps: true }
);

// Full-text search trên tên và mô tả
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ store_id: 1 });
productSchema.index({ category_ids: 1 });
productSchema.index({ status: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model('Product', productSchema);
