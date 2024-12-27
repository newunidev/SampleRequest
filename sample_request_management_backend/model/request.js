const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust path to your database setup

const Request = sequelize.define('Request', {
  Req_No: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  RequestFrom: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Buyer: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  SendTo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ContactPerson: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Contact: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  RequestDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  RequestedBy: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Department: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  tableName: 'requests', // Adjust table name if needed
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
  timestamps: true, // Includes createdAt and updatedAt fields
});

// Automatically set `Req_No` with prefix `REQ` followed by an incrementing number
Request.beforeValidate(async (request, options) => {
  if (!request.Req_No) {
    const lastRequest = await Request.findOne({
      order: [['Req_No', 'DESC']],
    });

    if (lastRequest) {
      const lastReqNo = lastRequest.Req_No;
      const lastNumber = parseInt(lastReqNo.replace('REQ', ''), 10);
      const nextNumber = lastNumber + 1;
      request.Req_No = `REQ${nextNumber.toString().padStart(3, '0')}`;
    } else {
      request.Req_No = 'REQ001'; // Default first request number
    }
  }
});

module.exports = Request;
