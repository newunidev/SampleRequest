const Thread = require('../model/thread'); // Adjust the path to the Thread model
const { Op } = require('sequelize');

class ThreadController {
  // Method to create a thread
  static async createThread(req, res) {
    try {
      const { sampleId, thread, brand, tkt, operation, position } = req.body;

      // Validation for required fields
      if (!sampleId || !thread || !brand || !tkt || !operation || !position) {
        return res.status(400).json({
          success: false,
          message: 'Sample ID, thread, brand, tkt, operation, and position are required.',
        });
      }

       

      // Create a new thread
      const newThread = await Thread.create({
        sampleId,
        thread,
        brand,
        tkt,
        operation,
        position,
      });

      res.status(201).json({
        success: true,
        message: 'Thread created successfully.',
        thread: newThread,
      });
    } catch (error) {
      console.error('Error creating thread:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }

  // Method to get all threads
  static async getAllThreads(req, res) {
    try {
      const threads = await Thread.findAll();

      res.status(200).json({
        success: true,
        threads,
      });
    } catch (error) {
      console.error('Error retrieving threads:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }

  // Method to get threads by sampleId using query parameter
  static async getThreadsBySampleId(req, res) {
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
      const threads = await Thread.findAll({
        where: { sampleId },
      });

      // Check if threads were found
      if (!threads || threads.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No threads found for the given sample ID.',
        });
      }

      // Return the threads
      res.status(200).json({
        success: true,
        threads,
      });
    } catch (error) {
      console.error('Error retrieving threads:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }
}

module.exports = ThreadController;