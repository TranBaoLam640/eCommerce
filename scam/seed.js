/**
 * seed.js – Tạo dữ liệu mẫu để test
 * Chạy: node seed.js
 */
const mongoose = require('mongoose');
const connectDB = require('./db');
const {
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
} = require('./models');

// ─── Helper ────────────────────────────────────────────
const bcryptHash = (plain) => `hashed_${plain}`; // Thay bằng bcrypt thật khi production

// ─── SEED ──────────────────────────────────────────────
const seed = async () => {
  await connectDB();

  // Xoá dữ liệu cũ
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
  console.log('🗑️  Đã xoá dữ liệu cũ\n');

  // ── 1. Roles ─────────────────────────────────────────
  const roles = await Role.insertMany([
    { name: 'admin', description: 'Quản trị viên hệ thống' },
    { name: 'seller', description: 'Người bán hàng' },
    { name: 'customer', description: 'Khách hàng' },
    { name: 'staff', description: 'Nhân viên hỗ trợ' },
    { name: 'shipper', description: 'Đối tác giao hàng' },
  ]);
  console.log(`✅ Roles: ${roles.length}`);

  // ── 2. Users ─────────────────────────────────────────
  const admin = await User.create({
    name: 'Admin Scam',
    email: 'admin@scam.vn',
    password: bcryptHash('admin123'),
    phone: '0901000001',
    role: 'admin',
  });
  const seller1 = await User.create({
    name: 'Nguyễn Văn Bán',
    email: 'seller@scam.vn',
    password: bcryptHash('seller123'),
    phone: '0901000002',
    role: 'seller',
  });
  const customer1 = await User.create({
    name: 'Trần Thị Mua',
    email: 'customer@scam.vn',
    password: bcryptHash('customer123'),
    phone: '0901000003',
    role: 'customer',
  });
  console.log('✅ Users: 3');

  // ── 3. User Roles ────────────────────────────────────
  await UserRole.insertMany([
    { user_id: admin._id, role_id: roles[0]._id, assigned_by: admin._id },
    { user_id: seller1._id, role_id: roles[1]._id, assigned_by: admin._id },
    { user_id: customer1._id, role_id: roles[2]._id, assigned_by: admin._id },
  ]);
  console.log('✅ UserRoles: 3');

  // ── 4. User Addresses ────────────────────────────────
  const addr = await UserAddress.create({
    user_id: customer1._id,
    label: 'Nhà',
    receiver_name: 'Trần Thị Mua',
    receiver_phone: '0901000003',
    province: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    street: '123 Đường Lê Lợi',
    location: { type: 'Point', coordinates: [106.6953, 10.7769] },
    is_default: true,
  });
  console.log('✅ UserAddresses: 1');

  // ── 5. Store ─────────────────────────────────────────
  const store = await Store.create({
    owner_id: seller1._id,
    name: 'Shop Công Nghệ ABC',
    slug: 'shop-cong-nghe-abc',
    description: 'Chuyên bán đồ công nghệ chính hãng',
    status: 'approved',
    phone: '0901000002',
    email: 'shop@abc.vn',
    address: {
      province: 'TP. Hồ Chí Minh',
      district: 'Quận 3',
      ward: 'Phường 7',
      street: '456 Đường CMT8',
    },
  });
  await User.findByIdAndUpdate(seller1._id, { store_id: store._id });
  console.log('✅ Store: 1');

  // ── 6. Categories ────────────────────────────────────
  const catElectronics = await Category.create({
    name: 'Điện tử',
    slug: 'dien-tu',
    level: 0,
    sort_order: 1,
  });
  const catPhones = await Category.create({
    name: 'Điện thoại',
    slug: 'dien-thoai',
    parent_id: catElectronics._id,
    level: 1,
    sort_order: 1,
  });
  const catFashion = await Category.create({
    name: 'Thời trang',
    slug: 'thoi-trang',
    level: 0,
    sort_order: 2,
  });
  console.log('✅ Categories: 3');

  // ── 7. Products ──────────────────────────────────────
  const product = await Product.create({
    store_id: store._id,
    name: 'iPhone 16 Pro Max',
    slug: 'iphone-16-pro-max',
    description: 'iPhone 16 Pro Max chính hãng Apple',
    price: 34990000,
    compare_at_price: 37990000,
    category_ids: [catElectronics._id, catPhones._id],
    brand: 'Apple',
    status: 'active',
    total_stock: 50,
  });
  console.log('✅ Products: 1');

  // ── 8. Product Categories (bảng nối) ─────────────────
  await ProductCategory.insertMany([
    { product_id: product._id, category_id: catElectronics._id },
    { product_id: product._id, category_id: catPhones._id },
  ]);
  console.log('✅ ProductCategories: 2');

  // ── 9. Product Variants ──────────────────────────────
  const variant1 = await ProductVariant.create({
    product_id: product._id,
    attributes: { color: 'Titan Đen', storage: '256GB' },
    sku: 'IP16PM-BLK-256',
    price: 34990000,
    stock: 30,
    weight: 227,
  });
  const variant2 = await ProductVariant.create({
    product_id: product._id,
    attributes: { color: 'Titan Trắng', storage: '512GB' },
    sku: 'IP16PM-WHT-512',
    price: 40990000,
    stock: 20,
    weight: 227,
  });
  console.log('✅ ProductVariants: 2');

  // ── 10. Product Images ───────────────────────────────
  await ProductImage.insertMany([
    { product_id: product._id, url: '/images/ip16-main.jpg', is_primary: true, sort_order: 0 },
    { product_id: product._id, variant_id: variant1._id, url: '/images/ip16-black.jpg', sort_order: 1 },
    { product_id: product._id, variant_id: variant2._id, url: '/images/ip16-white.jpg', sort_order: 2 },
  ]);
  console.log('✅ ProductImages: 3');

  // ── 11. Inventory Logs ───────────────────────────────
  await InventoryLog.insertMany([
    {
      variant_id: variant1._id,
      product_id: product._id,
      type: 'import',
      quantity_change: 30,
      stock_after: 30,
      performed_by: seller1._id,
      reason: 'Nhập kho lần đầu',
    },
    {
      variant_id: variant2._id,
      product_id: product._id,
      type: 'import',
      quantity_change: 20,
      stock_after: 20,
      performed_by: seller1._id,
      reason: 'Nhập kho lần đầu',
    },
  ]);
  console.log('✅ InventoryLogs: 2');

  // ── 12. Cart ─────────────────────────────────────────
  const cart = await Cart.create({
    user_id: customer1._id,
    total_items: 1,
    total_price: 34990000,
  });
  await CartItem.create({
    cart_id: cart._id,
    product_id: product._id,
    variant_id: variant1._id,
    quantity: 1,
    price_at_added: 34990000,
  });
  console.log('✅ Cart + CartItem: 1 + 1');

  // ── 13. Shipping Provider ────────────────────────────
  const ghn = await ShippingProvider.create({
    name: 'Giao Hàng Nhanh',
    code: 'GHN',
    api_url: 'https://dev-online-gateway.ghn.vn',
    is_active: true,
    description: 'Đối tác giao hàng GHN',
  });
  console.log('✅ ShippingProvider: 1');

  // ── 14. Voucher ──────────────────────────────────────
  const voucher1 = await Voucher.create({
    code: 'WELCOME50K',
    type: 'fixed_amount',
    value: 50000,
    min_order_value: 500000,
    scope: 'all',
    usage_limit: 100,
    usage_limit_per_user: 1,
    start_date: new Date(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    is_auto_apply: false,
    description: 'Giảm 50K cho đơn từ 500K',
    created_by: admin._id,
  });
  const voucher2 = await Voucher.create({
    code: 'FREESHIP',
    type: 'free_shipping',
    value: 0,
    min_order_value: 300000,
    scope: 'all',
    usage_limit: null,
    start_date: new Date(),
    end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    is_auto_apply: true,
    description: 'Miễn phí vận chuyển đơn từ 300K',
    created_by: admin._id,
  });
  console.log('✅ Vouchers: 2');

  // ── 15. Voucher Assignment ───────────────────────────
  await VoucherAssignment.create({
    voucher_id: voucher1._id,
    user_id: customer1._id,
  });
  console.log('✅ VoucherAssignment: 1');

  // ── 16. Order (snapshot address) ─────────────────────
  const order = await Order.create({
    user_id: customer1._id,
    store_id: store._id,
    order_code: 'SCM-20260309-001',
    status: 'confirmed',
    shipping_address: {
      receiver_name: 'Trần Thị Mua',
      receiver_phone: '0901000003',
      province: 'TP. Hồ Chí Minh',
      district: 'Quận 1',
      ward: 'Phường Bến Nghé',
      street: '123 Đường Lê Lợi',
    },
    subtotal: 34990000,
    shipping_fee: 30000,
    discount_amount: 50000,
    total: 34970000,
    payment_method: 'momo',
    payment_status: 'paid',
    note: 'Giao giờ hành chính',
  });
  console.log('✅ Order: 1');

  // ── 17. Order Items (snapshot product) ───────────────
  await OrderItem.create({
    order_id: order._id,
    product_snapshot: {
      product_id: product._id,
      variant_id: variant1._id,
      name: 'iPhone 16 Pro Max – Titan Đen, 256GB',
      sku: 'IP16PM-BLK-256',
      image: '/images/ip16-black.jpg',
      attributes: { color: 'Titan Đen', storage: '256GB' },
    },
    price: 34990000,
    quantity: 1,
    total: 34990000,
  });
  console.log('✅ OrderItem: 1');

  // ── 18. Order Status Logs ────────────────────────────
  await OrderStatusLog.insertMany([
    {
      order_id: order._id,
      from_status: null,
      to_status: 'pending',
      performed_by: customer1._id,
      reason: 'Khách hàng đặt đơn',
    },
    {
      order_id: order._id,
      from_status: 'pending',
      to_status: 'confirmed',
      performed_by: seller1._id,
      reason: 'Xác nhận đơn hàng',
    },
  ]);
  console.log('✅ OrderStatusLogs: 2');

  // ── 19. Order Voucher ────────────────────────────────
  await OrderVoucher.create({
    order_id: order._id,
    voucher_id: voucher1._id,
    discount_amount: 50000,
  });
  console.log('✅ OrderVoucher: 1');

  // ── 20. Payment ──────────────────────────────────────
  await Payment.create({
    order_id: order._id,
    method: 'momo',
    transaction_id: 'MOMO_TXN_123456',
    amount: 34970000,
    status: 'success',
    paid_at: new Date(),
  });
  console.log('✅ Payment: 1');

  // ── 21. Shipment ─────────────────────────────────────
  await Shipment.create({
    order_id: order._id,
    provider_id: ghn._id,
    tracking_number: 'GHN1234567890',
    status: 'in_transit',
    shipping_fee: 30000,
    weight: 227,
    estimated_delivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    tracking_events: [
      { status: 'picked_up', location: 'Quận 3, HCM', description: 'Đã lấy hàng' },
      { status: 'in_transit', location: 'Kho HCM', description: 'Đang vận chuyển' },
    ],
  });
  console.log('✅ Shipment: 1');

  // ── 22. Review ───────────────────────────────────────
  await Review.create({
    product_id: product._id,
    user_id: customer1._id,
    order_id: order._id,
    variant_id: variant1._id,
    rating: 5,
    comment: 'Sản phẩm chất lượng, giao hàng nhanh!',
    status: 'approved',
    seller_reply: {
      content: 'Cảm ơn bạn đã ủng hộ shop!',
      replied_at: new Date(),
    },
  });
  console.log('✅ Review: 1');

  // ── 23. Post ─────────────────────────────────────────
  await Post.create({
    title: 'Top 5 điện thoại đáng mua 2026',
    slug: 'top-5-dien-thoai-dang-mua-2026',
    content: 'Đây là danh sách top 5 điện thoại...',
    excerpt: 'Khám phá những chiếc điện thoại tốt nhất năm 2026',
    author_id: admin._id,
    status: 'published',
    tags: ['điện thoại', 'công nghệ', 'top'],
    published_at: new Date(),
  });
  console.log('✅ Post: 1');

  // ── DONE ─────────────────────────────────────────────
  console.log('\n🎉 Seed hoàn tất! Tất cả dữ liệu mẫu đã được tạo.');
  console.log('   Chạy `node index.js` để kiểm tra.\n');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
