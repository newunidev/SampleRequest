const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { Op } = require('sequelize'); // Adjust the path to your database setup
const SampleType = require('../model/sampletype.js');
const Division = require('../model/division.js');

const Sample = sequelize.define('Sample', {
  sampleId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  req_no: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Requests', // Adjust to the actual name of your Request table
      key: 'req_no',
    },
  },
  style: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sampleTypeId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'SampleTypes', // Adjust to the actual name of your SampleType table
      key: 'sampleTypeId',
    },
  },
  divisionId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Divisions', // Adjust to the actual name of your Division table
      key: 'divisionId',
    },
  },
  size: DataTypes.STRING,
  color: DataTypes.STRING,
  qty: DataTypes.INTEGER,
  uom: DataTypes.STRING,
  description: DataTypes.STRING,
  fbody: DataTypes.STRING,
  fabric1: DataTypes.STRING,
  fabric2: DataTypes.STRING,
  fabric3: DataTypes.STRING,
  fabric4: DataTypes.STRING,
  washtype: DataTypes.STRING,
  completetionDate: DataTypes.DATE,
  ReqDate: DataTypes.DATE,
  fdueDate: DataTypes.DATE,
  trimDueDate: DataTypes.DATE,
  embDueDate: DataTypes.DATE,
  sc: DataTypes.STRING,
  season: DataTypes.STRING,
  delivery: DataTypes.STRING,
  suimNo: DataTypes.STRING,
  Remarks: DataTypes.TEXT,
  techComments:DataTypes.TEXT,
  merchComments:DataTypes.TEXT,
}, {
  tableName: 'samples',
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
  timestamps: true,
});

// Auto-generate `sampleId` with a prefix `SAMP` followed by an incrementing number
Sample.beforeValidate(async (sample) => {
  if (!sample.sampleId) {
    const lastSample = await Sample.findOne({ order: [['sampleId', 'DESC']] });

    if (lastSample) {
      const lastSampleId = lastSample.sampleId;
      const lastNumber = parseInt(lastSampleId.replace('SAMP', ''), 10);
      const nextNumber = lastNumber + 1;
      sample.sampleId = `SAMP${nextNumber.toString().padStart(3, '0')}`;
    } else {
      sample.sampleId = 'SAMP001'; // Default ID for the first record
    }
  }
});

Sample.addHook('beforeCreate', async (sample) => {
    // Check if the `req_no` already exists with a different `style`
    const existingSampleWithDifferentStyle = await Sample.findOne({
      where: {
        req_no: sample.req_no,
        style: {
          [Op.ne]: sample.style, // Check for a different style
        },
      },
    });
  
    if (existingSampleWithDifferentStyle) {
      throw new Error('A request number cannot have multiple distinct styles.');
    }
  });

  Sample.belongsTo(SampleType, { foreignKey: 'sampleTypeId' });
  Sample.belongsTo(Division, { foreignKey: 'divisionId' });
  

module.exports = Sample;
