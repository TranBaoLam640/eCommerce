const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    // Vai trò chính – để query nhanh (admin | seller | customer | staff | shipper)
    role: {
      type: String,
      enum: ['admin', 'seller', 'customer', 'staff', 'shipper'],
      default: 'customer',
    },
    // Liên kết cửa hàng nếu user là seller
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      default: null,
    },
    // Refresh token lưu dạng đã mã hoá – không bao giờ lưu plain text
    refresh_token: {
      type: String,
      default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    last_login: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Indexes
userSchema.index({ role: 1 });

module.exports = mongoose.model('User', userSchema);
