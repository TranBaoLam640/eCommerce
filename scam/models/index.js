/**
 * models/index.js
 * Đăng ký và export tất cả Mongoose models
 */
const User = require('./User');
const UserAddress = require('./UserAddress');
const Role = require('./Role');
const UserRole = require('./UserRole');
const Store = require('./Store');
const Category = require('./Category');
const Product = require('./Product');
const ProductCategory = require('./ProductCategory');
const ProductVariant = require('./ProductVariant');
const ProductImage = require('./ProductImage');
const InventoryLog = require('./InventoryLog');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const OrderStatusLog = require('./OrderStatusLog');
const Payment = require('./Payment');
const Shipment = require('./Shipment');
const ShippingProvider = require('./ShippingProvider');
const Voucher = require('./Voucher');
const VoucherAssignment = require('./VoucherAssignment');
const OrderVoucher = require('./OrderVoucher');
const Review = require('./Review');
const Post = require('./Post');

module.exports = {
  User,
  UserAddress,
  Role,
  UserRole,
  Store,
  Category,
  Product,
  ProductCategory,
  ProductVariant,
  ProductImage,
  InventoryLog,
  Cart,
  CartItem,
  Order,
  OrderItem,
  OrderStatusLog,
  Payment,
  Shipment,
  ShippingProvider,
  Voucher,
  VoucherAssignment,
  OrderVoucher,
  Review,
  Post,
};
