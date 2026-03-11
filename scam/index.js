/**
 * index.js – Khởi động: kết nối DB và đăng ký tất cả models
 */
const connectDB = require('./db');
const models = require('./models');

const start = async () => {
  await connectDB();

  // Liệt kê tất cả collections đã đăng ký
  const modelNames = Object.keys(models);
  console.log(`\n📦 Đã đăng ký ${modelNames.length} models:`);
  modelNames.forEach((name, i) => {
    console.log(`   ${i + 1}. ${name}`);
  });

  console.log('\n🚀 Scam E-Commerce DB sẵn sàng!\n');
};

start().catch(console.error);
