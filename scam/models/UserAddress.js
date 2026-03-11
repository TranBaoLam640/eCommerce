const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    label: {
      type: String,
      trim: true,
      default: 'Home', // VD: Home, Office, ...
    },
    receiver_name: {
      type: String,
      required: true,
      trim: true,
    },
    receiver_phone: {
      type: String,
      required: true,
      trim: true,
    },
    province: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    ward: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    // Toạ độ GPS
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
    is_default: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userAddressSchema.index({ user_id: 1 });
userAddressSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('UserAddress', userAddressSchema);
