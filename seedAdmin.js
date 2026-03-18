const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@ceragreslux.com' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit();
    }

    const admin = new Admin({
      email: 'admin@ceragreslux.com',
      password: 'admin123', // Will be hashed automatically by pre-save hook
      role: 'superadmin'
    });

    await admin.save();
    console.log('✅ Default Admin User created successfully!');
    console.log('📧 Email: admin@ceragreslux.com');
    console.log('🔑 Password: admin123');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
