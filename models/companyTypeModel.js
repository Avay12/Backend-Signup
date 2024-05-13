const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const CompanyType = sequelize.define('CompanyType', {
  company_type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  company_type_name: {
    type: DataTypes.STRING(255),
    defaultValue: 'Amusement Park',
    allowNull: false,
  },
  status: DataTypes.BOOLEAN,
  user_id: DataTypes.INTEGER,
  created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_by: DataTypes.INTEGER,
  updated_date: DataTypes.DATE,
});

module.exports = CompanyType;
