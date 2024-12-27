const Request = require('../model/request'); // Import the Request model

class RequestController {
  // Method to create a request
  static async createRequest(req, res) {
    console.log('Method Called');
    try {
      const { RequestFrom, Buyer, Address, SendTo, ContactPerson, Contact, RequestDate, RequestedBy, Department } = req.body;
      console.log('Method Called'+RequestFrom);
      // Validation for required fields
      if (!RequestFrom || !Buyer || !RequestDate) {
        return res.status(400).json({
          success: false,
          message: 'RequestFrom, Buyer, and RequestDate are required',
        });
      }

      // Create a new request
      const newRequest = await Request.create({
        RequestFrom,
        Buyer,
        Address,
        SendTo,
        ContactPerson,
        Contact,
        RequestDate,
        RequestedBy,
        Department,
      });

      res.status(201).json({
        success: true,
        message: 'Request created successfully.',
        request: newRequest,
      });
    } catch (error) {
      console.error('Error creating request:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }

  // Method to get all requests
  static async getAllRequests(req, res) {
    try {
      const requests = await Request.findAll();

      res.status(200).json({
        success: true,
        message:'Successfully Retrieved Requests',
        requests,
      });
    } catch (error) {
      console.error('Error retrieving requests:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }
}

module.exports = RequestController;
