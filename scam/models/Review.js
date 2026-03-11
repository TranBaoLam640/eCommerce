const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Yêu cầu phải có đơn hàng thực tế
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    variant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductVariant',
      default: null,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      default: '',
    },
    // Ảnh/video đánh giá
    media: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ['image', 'video'], default: 'image' },
      },
    ],
    // Duyệt bởi admin/seller
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'hidden'],
      default: 'pending',
    },
    // Seller phản hồi
    seller_reply: {
      content: { type: String, trim: true, default: '' },
      replied_at: { type: Date, default: null },
    },
    // Tương tác
    likes_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Mỗi user chỉ review 1 lần per order + product
reviewSchema.index({ product_id: 1, user_id: 1, order_id: 1 }, { unique: true });
reviewSchema.index({ product_id: 1, status: 1 });
reviewSchema.index({ user_id: 1 });

module.exports = mongoose.model('Review', reviewSchema);
