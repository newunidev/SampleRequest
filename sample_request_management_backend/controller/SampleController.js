const Sample = require('../model/sample');
const Division = require('../model/division');
const SampleType = require('../model/sampletype'); // Adjust path to the Sample model
const { Op } = require('sequelize');
const sequelize = require('../database'); 

class SampleController {
  // // Method to create a sample
  // static async createSample(req, res) {
  //   try {
  //     const {
  //       req_no,
  //       style,
  //       sampleTypeId,
  //       divisionId,
  //       size,
  //       color,
  //       qty,
  //       uom,
  //       description,
  //       fbody,
  //       fabric1,
  //       fabric2,
  //       fabric3,
  //       fabric4,
  //       washtype,
  //       completetionDate,
  //       ReqDate,
  //       fdueDate,
  //       trimDueDate,
  //       embDueDate,
  //       sc,
  //       season,
  //       delivery,
  //       suimNo,
  //       Remarks,
  //     } = req.body;

  //     // Validation for required fields
  //     if (!req_no || !style || !sampleTypeId || !divisionId||!qty||!washtype||!completetionDate||!ReqDate||!fdueDate||!trimDueDate||!embDueDate) {
  //       return res.status(400).json({
  //         success: false,
  //         message: 'Request number, style, sample type, and division ID are required.',
  //       });
  //     }

  //     // Check for duplicate req_no and style
  //     const existingSample = await Sample.findOne({
  //       where: {
  //         req_no,
  //         style,
  //         color,
  //         size,
  //       },
  //     });

  //     if (existingSample) {
  //       return res.status(400).json({
  //         success: false,
  //         message: 'A request number can only have one style.',
  //       });
  //     }

  //     // Create a new sample
  //     const newSample = await Sample.create({
  //       req_no,
  //       style,
  //       sampleTypeId,
  //       divisionId,
  //       size,
  //       color,
  //       qty,
  //       uom,
  //       description,
  //       fbody,
  //       fabric1,
  //       fabric2,
  //       fabric3,
  //       fabric4,
  //       washtype,
  //       completetionDate,
  //       ReqDate,
  //       fdueDate,
  //       trimDueDate,
  //       embDueDate,
  //       sc,
  //       season,
  //       delivery,
  //       suimNo,
  //       Remarks,
  //     });

  //     res.status(201).json({
  //       success: true,
  //       message: 'Sample created successfully.',
  //       sample: newSample,
  //     });
  //   } catch (error) {
  //     console.error('Error creating sample:', error);
  //     res.status(500).json({
  //       success: false,
  //       message: 'Internal server error.',
  //     });
  //   }
  // }

  static async createSample(req, res) {
    try {
      const {
        req_no,
        style,
        sampleTypeId,
        divisionId,
        size,
        color,
        qty,
        uom,
        description,
        fbody,
        fabric1 = "N/A",
        fabric2 = "N/A",
        fabric3 = "N/A",
        fabric4 = "N/A",
        washtype,
        completetionDate,
        ReqDate,
        fdueDate,
        trimDueDate,
        embDueDate,
        sc ="N/A",
        season ="N/A",
        delivery ="N/A",
        suimNo ="N/A",
        Remarks ="N/A",
        merchComments="N/A",
        techComments="N/A",
      } = req.body;
  
      // Validation for required fields
      if (
        !req_no ||
        !style ||
        !sampleTypeId ||
        !divisionId ||
        !qty ||
        !washtype ||
        !completetionDate ||
        !ReqDate ||
        !fdueDate ||
        !trimDueDate ||
        !embDueDate
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Request number, style, sample type, and division ID are required.",
        });
      }
  
      // Check for duplicate req_no and style
      const existingSample = await Sample.findOne({
        where: {
          req_no,
          style,
          color,
          size,
        },
      });
  
      if (existingSample) {
        return res.status(400).json({
          success: false,
          message: "A request number can only have one style.",
        });
      }
  
      // Create a new sample
      const newSample = await Sample.create({
        req_no,
        style,
        sampleTypeId,
        divisionId,
        size,
        color,
        qty,
        uom,
        description,
        fbody,
        fabric1,
        fabric2,
        fabric3,
        fabric4,
        washtype,
        completetionDate,
        ReqDate,
        fdueDate,
        trimDueDate,
        embDueDate,
        sc,
        season,
        delivery,
        suimNo,
        Remarks,
        techComments,
        merchComments,
      });
  
      res.status(201).json({
        success: true,
        message: "Sample created successfully.",
        sample: newSample,
      });
    } catch (error) {
      console.error("Error creating sample:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }
  

  // Method to get all samples
  static async getAllSamples(req, res) {
    try {
      const samples = await Sample.findAll();

      res.status(200).json({
        success: true,
        samples,
      });
    } catch (error) {
      console.error('Error retrieving samples:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }


  static async getUniqueStyles(req, res) {
    try {
      // Fetch all unique styles
      const uniqueStyles = await Sample.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('style')), 'style']], // Select distinct styles
        raw: true, // Simplify the results
      });
  
      // Format the styles list to match the desired response format
      const styles = uniqueStyles.map((styleObj) => ({
        style: styleObj.style,
      }));
  
      res.status(200).json({
        success: true,
        message: 'Unique styles retrieved successfully.',
        styles, // Return the list of styles in the desired format
      });
    } catch (error) {
      console.error('Error retrieving unique styles:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }
  

  //method to get all samples for given style
  static async getAllSamplesForStyle(req, res) {
    try {
      // Extract style from query parameters (you can use params if you prefer)
      const { style } = req.query;
  
      // Validate if style is provided
      if (!style) {
        return res.status(400).json({
          success: false,
          message: 'Style is required to fetch samples.',
        });
      }
  
      // Fetch all samples matching the given style
      const samples = await Sample.findAll({
        where: { style }, // Match the style
      });
  
      // Check if any samples were found
      if (samples.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No samples found for the provided style.',
        });
      }
  
      // Return the list of samples for the given style
      res.status(200).json({
        success: true,
        samples,
      });
    } catch (error) {
      console.error('Error retrieving samples for style:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }


  //method to get all samples for given Request No
  static async getAllSamplesForRequestNo(req, res) {
    try {
      // Extract style from query parameters (you can use params if you prefer)
      const { req_no } = req.query;
  
      // Validate if style is provided
      if (!req_no) {
        return res.status(400).json({
          success: false,
          message: 'Style is required to fetch samples.',
        });
      }
  
      // Fetch all samples matching the given style
      const samples = await Sample.findAll({
        where: { req_no }, // Match the style
      });
  
      // Check if any samples were found
      if (samples.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No samples found for the provided Request No.',
        });
      }
  
      // Return the list of samples for the given style
      res.status(200).json({
        success: true,
        samples,
      });
    } catch (error) {
      console.error('Error retrieving samples for style:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }

  //method to get sample for given Sample No
  static async getSampleForSampleNo(req, res) {
    try {
      // Extract style from query parameters (you can use params if you prefer)
      const { SampleId } = req.query;
  
      // Validate if style is provided
      if (!SampleId) {
        return res.status(400).json({
          success: false,
          message: 'Sample Id is required to fetch samples.',
        });
      }
  
      // Fetch all samples matching the given style
      const samples = await Sample.findAll({
        where: { SampleId }, // Match the style
      });
  
      // Check if any samples were found
      if (samples.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No samples found for the provided Request No.',
        });
      }
  
      // Return the list of samples for the given style
      res.status(200).json({
        success: true,
        samples,
      });
    } catch (error) {
      console.error('Error retrieving samples for style:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }

  // Method to get sample for given Sample No
  static async getSampleForSampleNoNew(req, res) {
    try {
      // Extract SampleId from query parameters
      const { SampleId } = req.query;
  
      // Validate if SampleId is provided
      if (!SampleId) {
        return res.status(400).json({
          success: false,
          message: 'Sample Id is required to fetch samples.',
        });
      }
  
      // Fetch the sample with related names for SampleType, Division
      const sample = await Sample.findOne({
        where: { sampleId: SampleId },
        include: [
          {
            model: SampleType, // Assuming you have a SampleType model
            attributes: ['Name'], // Fetch only the 'name' field
          },
          {
            model: Division, // Assuming you have a Division model
            attributes: ['name'], // Fetch only the 'name' field
          },
        ],
      });
  
      // Check if the sample was found
      if (!sample) {
        return res.status(404).json({
          success: false,
          message: 'No sample found for the provided Sample Id.',
        });
      }
      
      // Format the response to include the names directly
      const formattedSample = {
        ...sample.toJSON(),
        sampleTypeName: sample.SampleType?.Name || null,  
        divisionName: sample.Division?.name || null,  
      };
  
       
      delete formattedSample.SampleType;
      delete formattedSample.Division;
       
      const response = {
        success: true,
        samples: [formattedSample],  
      };
  
      // Return the formatted sample
      res.status(200).json(response);
    } catch (error) {
      console.error('Error retrieving sample for Sample Id:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }

  



  
  


}

module.exports = SampleController;
