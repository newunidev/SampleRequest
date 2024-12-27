const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust path to your database setup

const SampleType = sequelize.define('SampleType', {
  sampleTypeId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  Name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'sampletypes', // Adjust table name if needed
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
  timestamps: true, // Includes createdAt and updatedAt fields
});

// Automatically set `sampleTypeId` with prefix `ST` followed by an incrementing number
SampleType.beforeValidate(async (sampleType, options) => {
  if (!sampleType.sampleTypeId) {
    const lastSampleType = await SampleType.findOne({
      order: [['sampleTypeId', 'DESC']],
    });

    if (lastSampleType) {
      const lastSampleTypeId = lastSampleType.sampleTypeId;
      const lastNumber = parseInt(lastSampleTypeId.replace(/[^\d]/g, ''), 10); // Extract numeric part only
      const nextNumber = lastNumber + 1;
      sampleType.sampleTypeId = `SMPTID${nextNumber.toString().padStart(3, '0')}`;
    } else {
      sampleType.sampleTypeId = 'SMPTID001'; // Default first sample type ID
    }
  }
});

module.exports = SampleType;
