const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const CompanyDetails = require('./companyDetailsModel');

const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: DataTypes.STRING(255),
  last_name: DataTypes.STRING(255),
  email: DataTypes.STRING(255),
  contact: DataTypes.STRING(20),
  address: DataTypes.STRING(255),
  vatpanno: DataTypes.INTEGER,
  company_name: DataTypes.STRING(255),
  company_email: DataTypes.STRING(255),
  company_contact: DataTypes.STRING(20),
  company_address: DataTypes.STRING(255),
  company_vatpanno: DataTypes.INTEGER,
  has_membership: DataTypes.BOOLEAN,
  for_company_id: DataTypes.INTEGER,
  for_outlet_id: DataTypes.INTEGER,
  status: DataTypes.BOOLEAN,
  created_by: DataTypes.INTEGER,
  created_date: DataTypes.DATE,
  updated_by: DataTypes.INTEGER,
  updated_date: DataTypes.DATE,
  deleted_by: DataTypes.INTEGER,
  deleted_date: DataTypes.DATE,
});

Customer.belongsTo(CompanyDetails, { foreignKey: 'company_id' });

module.exports = Customer;
