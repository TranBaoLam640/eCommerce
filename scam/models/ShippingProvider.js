const mongoose = require('mongoose');

const shippingProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true, // VD: GHN, GHTK, JNT, VIETTEL_POST
    },
    logo: {
      type: String,
      default: null,
    },
    // Thông tin API của đối tác
    api_url: {
      type: String,
      trim: true,
      default: '',
    },
    api_key: {
      type: String,
      trim: true,
      default: '',
    },
    // Bảng giá cước cơ bản
    pricing: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    // Danh sách khu vực hỗ trợ
    supported_areas: {
      type: [String],
      default: [],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

shippingProviderSchema.index({ is_active: 1 });

module.exports = mongoose.model('ShippingProvider', shippingProviderSchema);
