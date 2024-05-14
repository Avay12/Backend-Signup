const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Role = sequelize.define('Role', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_name: {
    type: DataTypes.STRING(255),
    defaultValue: 'admin',
    allowNull: false,
  },
  created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_by: DataTypes.INTEGER,
  updated_date: DataTypes.DATE,
  deleted_by: DataTypes.INTEGER,
  deleted_date: DataTypes.DATE,
  customer_id: DataTypes.INTEGER,
  Status: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Role;
