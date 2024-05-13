const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const company = require('../models/companyTypeModel');
const User = require('./userModel');

const CompanyDetails = sequelize.define('CompanyDetails', {
  company_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  company_type_id: DataTypes.INTEGER,
  company_name: DataTypes.STRING(255),
  address: DataTypes.TEXT,
  vat_pan_no: DataTypes.STRING(20),
  logo: DataTypes.STRING(255),
  email: { type: DataTypes.STRING(255), validate: { isEmail: true } },
  website: DataTypes.STRING(255),
  contact: { type: DataTypes.INTEGER, validate: { min: 10 } },
  status: DataTypes.BOOLEAN,
  user_id: DataTypes.INTEGER,
  created_date: DataTypes.DATE,
  updated_by: DataTypes.INTEGER,
  updated_date: DataTypes.DATE,
});
CompanyDetails.belongsTo(company, { foreignKey: 'company_type_id' });
CompanyDetails.belongsTo(User, { foreignKey: 'user_id' });

module.exports = CompanyDetails;
