const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust the path to your database setup

const Buyer = sequelize.define('Buyer', {
  bId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  buyerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'buyers', // Specify the table name
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
  timestamps: true, // Automatically adds `createdAt` and `updatedAt`
});

// Auto-generate `bId` with the prefix `BY`
Buyer.beforeValidate(async (buyer, options) => {
  if (!buyer.bId) {
    const lastBuyer = await Buyer.findOne({
      order: [['bId', 'DESC']],
    });

    if (lastBuyer) {
      const lastBuyerId = lastBuyer.bId;
      const lastNumber = parseInt(lastBuyerId.replace('BY', ''), 10);
      const nextNumber = lastNumber + 1;
      buyer.bId = `BY${nextNumber.toString().padStart(3, '0')}`;
    } else {
      buyer.bId = 'BY001'; // Default first buyer ID
    }
  }
});

module.exports = Buyer;
