const Buyer = require('../model/buyer'); // Import the Buyer model

class BuyerController {
  // Method to create a new buyer
  static async createBuyer(req, res) {
    try {
      const { buyerName, address } = req.body;

      // Validation for required fields
      if (!buyerName) {
        return res.status(400).json({
          success: false,
          message: 'Buyer Name is required.',
        });
      }

      // Create a new buyer
      const newBuyer = await Buyer.create({
        buyerName,
        address,
      });

      res.status(201).json({
        success: true,
        message: 'Buyer created successfully.',
        buyer: newBuyer,
      });
    } catch (error) {
      console.error('Error creating buyer:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }

  // Method to get all buyers
  static async getAllBuyers(req, res) {
    try {
      const buyers = await Buyer.findAll();

      res.status(200).json({
        success: true,
        buyers,
      });
    } catch (error) {
      console.error('Error retrieving buyers:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }
}

module.exports = BuyerController;
