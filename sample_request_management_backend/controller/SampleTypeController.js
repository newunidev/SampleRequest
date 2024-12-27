const SampleType = require('../model/sampletype.js'); // Import the SampleType model

class SampleTypeController {
  /**
   * Method to create a new sample type
   */
  static async createSampleType(req, res) {
    try {
      const { Name } = req.body;

      // Validation for required fields
      if (!Name) {
        return res.status(400).json({
          success: false,
          message: 'Sample type name is required.',
        });
      }

      // Create a new sample type
      const newSampleType = await SampleType.create({
        Name,
      });

      res.status(201).json({
        success: true,
        message: 'Sample type created successfully.',
        sampleType: newSampleType,
      });
    } catch (error) {
      console.error('Error creating sample type:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }

  /**
   * Method to get all sample types
   */
  static async getAllSampleTypes(req, res) {
    try {
      const sampleTypes = await SampleType.findAll();

      res.status(200).json({
        success: true,
        sampleTypes,
      });
    } catch (error) {
      console.error('Error retrieving sample types:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }
}

module.exports = SampleTypeController;
