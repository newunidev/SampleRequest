const Trim = require('../model/trim'); // Adjust the path to your Trim model
const { Op } = require('sequelize');

class TrimController {
  /**
   * Method to create a new trim
   */
  static async createTrim(req, res) {
    try {
      const { sampleId, trim, description, sizeQtyPerGarment, remarks = "N/A" } = req.body;

      // Validate required fields
      if (!sampleId || !description || !sizeQtyPerGarment) {
        return res.status(400).json({
          success: false,
          message: "Sample ID, description, and size/quantity per garment are required.",
        });
      }

      // Create a new trim
      const newTrim = await Trim.create({
        sampleId,
        trim,
        description,
        sizeQtyPerGarment,
        remarks,
      });

      res.status(201).json({
        success: true,
        message: "Trim created successfully.",
        trim: newTrim,
      });
    } catch (error) {
      console.error("Error creating trim:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }

  /**
   * Method to retrieve all trims
   */
  static async getAllTrims(req, res) {
    try {
      const trims = await Trim.findAll();

      res.status(200).json({
        success: true,
        trims,
      });
    } catch (error) {
      console.error("Error retrieving trims:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }


  //get thrims by given trim details
  // Method to get threads by sampleId using query parameter
  static async getTrimsBySampleId(req, res) {
    try {
      // Extract sampleId from query parameters
      const { sampleId } = req.query;

      // Validate that sampleId is provided
      if (!sampleId) {
        return res.status(400).json({
          success: false,
          message: 'sampleId query parameter is required.',
        });
      }

      // Fetch threads for the given sampleId
      const trims = await Trim.findAll({
        where: { sampleId },
      });

      // Check if threads were found
      if (!trims || trims.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No trims found for the given sample ID.',
        });
      }

      // Return the threads
      res.status(200).json({
        success: true,
        trims,
      });
    } catch (error) {
      console.error('Error retrieving trims:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }
}

module.exports = TrimController;
