const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const OutletType = sequelize.define('OutletType', {
  outlet_type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  outlet_type_name: DataTypes.STRING(255),
  status: DataTypes.BOOLEAN,
  user_id: DataTypes.INTEGER,
  created_date: DataTypes.DATE,
  updated_by: DataTypes.INTEGER,
  updated_date: DataTypes.DATE,
});

module.exports = OutletType;
