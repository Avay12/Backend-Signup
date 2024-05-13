const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const CompanyDetails = require('./companyDetailsModel');
const OutletType = require('./OutletTypeModel');

const Outlet = sequelize.define('Outlet', {
  outlet_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  outlet_name: {
    type: DataTypes.STRING(255),
    defaultValue: 'Ticketing System',
  },
  address: DataTypes.TEXT,
  vat_pan_no: DataTypes.STRING(20),
  logo: DataTypes.STRING(255),
  email: DataTypes.STRING(255),
  website: DataTypes.STRING(255),
  contact: DataTypes.STRING(20),
  status: DataTypes.BOOLEAN,
  created_by: DataTypes.INTEGER,
  created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_by: DataTypes.INTEGER,
  updated_date: DataTypes.DATE,
  company_id: DataTypes.INTEGER,
  outlet_type_id: DataTypes.INTEGER,
});

Outlet.belongsTo(CompanyDetails, { foreignKey: 'company_id' });
Outlet.belongsTo(OutletType, { foreignKey: 'outlet_type_id' });

module.exports = Outlet;
