const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    // Loại giảm giá
    type: {
      type: String,
      enum: ['percentage', 'fixed_amount', 'free_shipping'],
      required: true,
    },
    // Giá trị giảm (% hoặc số tiền)
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    // Giảm tối đa (áp dụng khi type = percentage)
    max_discount: {
      type: Number,
      default: null,
    },
    // Đơn tối thiểu để áp dụng
    min_order_value: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Phạm vi áp dụng
    scope: {
      type: String,
      enum: ['all', 'store', 'category', 'product'],
      default: 'all',
    },
    // ID liên quan (store/category/product) tuỳ scope
    scope_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    // Giới hạn sử dụng
    usage_limit: {
      type: Number,
      default: null, // null = không giới hạn
    },
    used_count: {
      type: Number,
      default: 0,
    },
    // Giới hạn mỗi user
    usage_limit_per_user: {
      type: Number,
      default: 1,
    },
    // Thời gian hiệu lực
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    // Tự động áp dụng (không cần nhập code)
    is_auto_apply: {
      type: Boolean,
      default: false,
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
    // Ai tạo voucher (Admin hoặc Seller)
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

voucherSchema.index({ is_active: 1, start_date: 1, end_date: 1 });
voucherSchema.index({ scope: 1, scope_id: 1 });

module.exports = mongoose.model('Voucher', voucherSchema);
