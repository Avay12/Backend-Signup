const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = require('../utils/db');

const Role = require('../models/roleModel');
const CompanyDetails = require('../models/companyDetailsModel');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  company_id: DataTypes.INTEGER,
  company_name: DataTypes.STRING(255),
  outlet_id: DataTypes.INTEGER,
  default_outlet_id: DataTypes.INTEGER,
  company_name: DataTypes.STRING(255),
  email: { type: DataTypes.STRING(255), validate: { isEmail: true } },
  mobile_no: { type: DataTypes.STRING(20), validate: { min: 10 } },
  password: {
    type: DataTypes.STRING(255),
    validate: {
      len: {
        args: [8, Infinity], // Minimum length of 10 characters
        msg: 'Password must be at least 10 characters long',
      },
    },
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    validate: {
      isSamePassword(value) {
        if (value !== this.password) {
          throw new Error('Passwords do not match');
        }
      },
    },
  },
  role_id: DataTypes.INTEGER,
  referralCode: DataTypes.STRING(50),
  referrerID: DataTypes.INTEGER,
  referrer_earn_amt: DataTypes.DECIMAL(10, 2),
  address: DataTypes.TEXT,
  created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_by: DataTypes.INTEGER,
  updated_date: DataTypes.DATE,
  deleted_by: DataTypes.INTEGER,
  deleted_date: DataTypes.DATE,
  Status: DataTypes.BOOLEAN,
  otp: DataTypes.INTEGER,
  // otpExpires: DataTypes.DATE,
});

User.belongsTo(Role, {
  foreignKey: 'role_id',
  onDelete: 'CASCADE',
});

// Before saving the user, hash the password and set confirmPassword to undefined
User.beforeSave(async (user, options) => {
  // Only hash the password if it has been modified
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 12);
    // Set confirmPassword to undefined
    user.confirmPassword = undefined;
  }
});

// Method to generate and store OTP for the user

module.exports = User;
