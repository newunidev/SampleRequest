const Division = require('../model/division.js'); // Import the Division model

class DivisionController {
  /**
   * Method to create a new division
   */
  static async createDivision(req, res) {
    try {
      const { name } = req.body;

      // Validation for required fields
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Division name is required.',
        });
      }

      // Create a new division
      const newDivision = await Division.create({
        name,
      });

      res.status(201).json({
        success: true,
        message: 'Division created successfully.',
        division: newDivision,
      });
    } catch (error) {
      console.error('Error creating division:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }

  /**
   * Method to get all divisions
   */
  static async getAllDivisions(req, res) {
    try {
      const divisions = await Division.findAll();

      res.status(200).json({
        success: true,
        divisions,
      });
    } catch (error) {
      console.error('Error retrieving divisions:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }
}

module.exports = DivisionController;
