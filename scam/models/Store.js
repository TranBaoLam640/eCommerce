const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // 1 seller – 1 cửa hàng
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
      trim: true,
      default: '',
    },
    logo: {
      type: String,
      default: null,
    },
    banner: {
      type: String,
      default: null,
    },
    // Trạng thái duyệt bởi Admin
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'suspended'],
      default: 'pending',
    },
    // Thông tin liên hệ cửa hàng
    phone: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true },
    address: {
      province: { type: String, trim: true },
      district: { type: String, trim: true },
      ward: { type: String, trim: true },
      street: { type: String, trim: true },
    },
    rating_avg: { type: Number, default: 0, min: 0, max: 5 },
    rating_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

storeSchema.index({ status: 1 });

module.exports = mongoose.model('Store', storeSchema);
