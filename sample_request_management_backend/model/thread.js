const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust the path to your database setup

const Thread = sequelize.define('Thread', {
  threadId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  sampleId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'samples', // Name of the Sample table
      key: 'sampleId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  thread: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  tkt: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  operation: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'threads', // Adjust table name if needed
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
  timestamps: true, // Includes createdAt and updatedAt fields
});

// Automatically set `threadId` with prefix `TH` followed by an incrementing number
Thread.beforeValidate(async (thread, options) => {
  if (!thread.threadId) {
    const lastThread = await Thread.findOne({
      order: [['threadId', 'DESC']],
    });

    if (lastThread) {
      const lastThreadId = lastThread.threadId;
      const lastNumber = parseInt(lastThreadId.replace('TH', ''), 10);
      const nextNumber = lastNumber + 1;
      thread.threadId = `TH${nextNumber.toString().padStart(3, '0')}`;
    } else {
      thread.threadId = 'TH001'; // Default first thread ID
    }
  }
});

module.exports = Thread;
