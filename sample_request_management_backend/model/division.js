const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust path to your database setup

const Division = sequelize.define('Division', {
  divisionId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'divisions', // Adjust table name if needed
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
  timestamps: true, // Includes createdAt and updatedAt fields
});

// Automatically set `divisionId` with prefix `DIV` followed by an incrementing number
Division.beforeValidate(async (division, options) => {
  if (!division.divisionId) {
    const lastDivision = await Division.findOne({
      order: [['divisionId', 'DESC']],
    });

    if (lastDivision) {
      const lastDivisionId = lastDivision.divisionId;
      const lastNumber = parseInt(lastDivisionId.replace('DIV', ''), 10);
      const nextNumber = lastNumber + 1;
      division.divisionId = `DIV${nextNumber.toString().padStart(3, '0')}`;
    } else {
      division.divisionId = 'DIV001'; // Default first division ID
    }
  }
});

module.exports = Division;
