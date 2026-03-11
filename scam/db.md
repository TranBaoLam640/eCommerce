# 🛒 Scam – E-Commerce MongoDB Database


Database MongoDB cho nền tảng thương mại điện tử, xây dựng bằng **Mongoose**.


## Cấu trúc Project


```
Scam/
├── db.js               # Kết nối MongoDB
├── index.js            # Khởi động – đăng ký tất cả models
├── seed.js             # Tạo dữ liệu mẫu để test
├── .env.example        # Mẫu file cấu hình môi trường
├── package.json
└── models/             # 25 collections
```


## Cài đặt & Chạy


```bash
cp .env.example .env    # Tạo file .env rồi điền MONGODB_URI & JWT secrets
npm install             # Cài thư viện
node index.js           # Kiểm tra kết nối và collections
node seed.js            # Tạo dữ liệu mẫu
```


---


## Danh Sách Collections (25)


### 👤 Người dùng & Xác thực


| Collection | Mô tả |
|---|---|
| `users` | Tài khoản người dùng. Lưu vai trò chính (`role`) và liên kết cửa hàng nếu là Seller |
| `user_addresses` | Danh sách địa chỉ của người dùng (mỗi người có thể có nhiều địa chỉ). Hỗ trợ toạ độ GPS |
| `roles` | Danh sách các vai trò trong hệ thống: admin, seller, customer, staff, shipper |
| `user_roles` | Gán vai trò cho người dùng. Một người có thể có nhiều vai trò |


### 🏪 Cửa hàng (Seller)


| Collection | Mô tả |
|---|---|
| `stores` | Hồ sơ cửa hàng của Seller. Tách riêng khỏi User để dễ quản lý. Cần Admin duyệt trước khi hoạt động |


### 📦 Sản phẩm


| Collection | Mô tả |
|---|---|
| `categories` | Danh mục sản phẩm. Hỗ trợ danh mục con qua trường `parent_id` |
| `products` | Thông tin sản phẩm. Hỗ trợ tìm kiếm toàn văn (full-text search) |
| `product_categories` | Bảng liên kết sản phẩm với danh mục (quan hệ nhiều–nhiều) |
| `product_variants` | Các biến thể của sản phẩm (màu sắc, kích cỡ, SKU, giá, tồn kho...) |
| `product_images` | Ảnh của sản phẩm hoặc biến thể. Đánh dấu ảnh chính bằng `is_primary` |
| `inventory_logs` | Lịch sử nhập/xuất kho, dùng để kiểm tra và đối soát |


### 🛒 Giỏ hàng


| Collection | Mô tả |
|---|---|
| `carts` | Giỏ hàng của người dùng (mỗi người có 1 giỏ). Lưu tổng số lượng và tổng tiền tạm tính |
| `cart_items` | Từng sản phẩm trong giỏ hàng. Lưu giá tại thời điểm thêm vào và hỗ trợ "lưu để mua sau" |


### 📋 Đơn hàng


| Collection | Mô tả |
|---|---|
| `orders` | Đơn hàng (mỗi đơn chỉ có sản phẩm từ 1 seller). Lưu kèm địa chỉ giao hàng tại thời điểm đặt |
| `order_items` | Chi tiết sản phẩm trong đơn hàng. Lưu lại tên, SKU, giá – không bị thay đổi khi sản phẩm cập nhật sau này |
| `order_status_logs` | Lịch sử thay đổi trạng thái đơn hàng (ai thay đổi, khi nào, lý do gì) |


### 💳 Thanh toán & Vận chuyển


| Collection | Mô tả |
|---|---|
| `payments` | Thông tin thanh toán của đơn hàng. Lưu mã giao dịch và hỗ trợ hoàn tiền |
| `shipments` | Vận đơn giao hàng. Lưu toàn bộ lịch sử theo dõi giao hàng |
| `shipping_providers` | Thông tin đối tác vận chuyển (GHN, GHTK, J&T...). Lưu API key và bảng giá cước |


### 🎫 Voucher


| Collection | Mô tả |
|---|---|
| `vouchers` | Mã giảm giá (theo %, theo số tiền, hoặc miễn phí vận chuyển). Hỗ trợ tự động áp dụng |
| `voucher_assignments` | Gán voucher riêng cho từng người dùng cụ thể |
| `order_vouchers` | Danh sách voucher đã dùng cho một đơn hàng (hỗ trợ dùng nhiều voucher cùng lúc) |


### ⭐ Đánh giá & Nội dung


| Collection | Mô tả |
|---|---|
| `reviews` | Đánh giá sản phẩm. Yêu cầu phải có đơn hàng thực tế. Hỗ trợ duyệt và seller phản hồi |
| `posts` | Bài viết tin tức / blog (tuỳ chọn) |


---


## Phân quyền (RBAC)


Mỗi người dùng có một vai trò chính lưu trong `User.role` để query nhanh. Ngoài ra, bảng `user_roles` là nguồn chính xác nhất khi một người cần nhiều vai trò.


| Vai trò | Quyền hạn |
|---------|-----------|
| `admin` | Quản trị toàn bộ hệ thống |
| `seller` | Quản lý sản phẩm và đơn hàng của cửa hàng mình |
| `customer` | Mua sắm bình thường |
| `staff` | Nhân viên hỗ trợ nội bộ |
| `shipper` | Đối tác giao hàng |


---


## Sơ đồ Quan hệ


```
roles ◄──── user_roles ────► users
                                ├── user_addresses (1 user – nhiều địa chỉ)
                                ├── stores (1 seller – 1 cửa hàng)
                                │     └── products (1 cửa hàng – nhiều sản phẩm)
                                │           ├── product_categories (nhiều–nhiều) ──► categories
                                │           ├── product_variants (1 SP – nhiều biến thể)
                                │           │     └── inventory_logs (lịch sử kho)
                                │           └── product_images (ảnh SP)
                                │
                                ├── carts (1 user – 1 giỏ) ──► cart_items (nhiều dòng)
                                │
                                └── orders (1 user – nhiều đơn)
                                      ├── order_items (sản phẩm trong đơn)
                                      ├── order_status_logs (lịch sử trạng thái)
                                      ├── payments (1 đơn – 1 thanh toán)
                                      ├── shipments (1 đơn – 1 vận đơn) ──► shipping_providers
                                      └── order_vouchers (nhiều voucher) ──► vouchers
                                                                              └── voucher_assignments ──► users
```


---


## Ghi Chú Thiết Kế


| Quyết định | Lý do |
|------------|-------|
| **Lưu snapshot** trong `order_items` và địa chỉ | Bảo toàn lịch sử đơn hàng dù sản phẩm/địa chỉ có bị sửa sau này |
| **Lưu danh mục 2 chỗ** (mảng trong product + bảng `product_categories`) | Mảng để query nhanh; bảng nối là dữ liệu chính xác nhất |
| **Tách `cart_items` riêng** | Dễ cập nhật từng dòng, hỗ trợ phân trang và đồng bộ thời gian thực |
| **Nhiều voucher / đơn** qua `order_vouchers` | Cho phép dùng đồng thời nhiều mã giảm giá; logic tính toán ở tầng service |
| **Tách `stores` khỏi `users`** | Tránh làm User quá phức tạp; có quy trình duyệt cửa hàng riêng |
| **Lưu lịch sử giao hàng trong `shipments`** | Mảng tracking events lưu toàn bộ lịch sử từ đơn vị vận chuyển |
| **Refresh token lưu dạng đã mã hoá** | Tránh lộ token thật; không bao giờ lưu plain text |



