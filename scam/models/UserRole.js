const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    assigned_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

// Một user không được gán trùng vai trò
userRoleSchema.index({ user_id: 1, role_id: 1 }, { unique: true });

module.exports = mongoose.model('UserRole', userRoleSchema);
