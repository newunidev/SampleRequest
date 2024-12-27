const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust the path to your database setup

const Trim = sequelize.define('Trim', {
  trimId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  sampleId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Samples', // Ensure this matches the name of the Sample model
      key: 'sampleId',
    },
  },
  trim:{
    type:DataTypes.STRING(255),
    allowNull:false
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  sizeQtyPerGarment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remarks: {
    type: DataTypes.STRING(500),
    allowNull: true, // Optional field
  },
}, {
  tableName: 'trims', // Adjust the table name if needed
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
  timestamps: true, // Includes createdAt and updatedAt
});

// Automatically set `trimId` with prefix `TRIM` followed by an incrementing number
Trim.beforeValidate(async (trim, options) => {
  if (!trim.trimId) {
    const lastTrim = await Trim.findOne({
      order: [['trimId', 'DESC']],
    });

    if (lastTrim) {
      const lastTrimId = lastTrim.trimId;
      const lastNumber = parseInt(lastTrimId.replace('TRIM', ''), 10);
      const nextNumber = lastNumber + 1;
      trim.trimId = `TRIM${nextNumber.toString().padStart(3, '0')}`;
    } else {
      trim.trimId = 'TRIM001'; // Default first trim ID
    }
  }
});

module.exports = Trim;
