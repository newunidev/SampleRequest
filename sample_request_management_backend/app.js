const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database'); // Import the Sequelize instance
const jwt = require('jsonwebtoken');
 
const fs = require('fs'); // Import the file system module
const path = require('path');


const Employee = require('./model/Employee.js');
const EmployeeController = require('./controller/EmployeeController.js');


const Request = require('./model/request.js');
const RequestController = require('./controller/RequestController.js');


const Buyer = require('./model/buyer.js');
const BuyerController = require('./controller/BuyerController.js');
 

const SampleType = require('./model/sampletype.js');
const SampleTypeController = require('./controller/SampleTypeController.js');


const Division = require('./model/division.js');
const DivisionController = require('./controller/DivisionController.js');

const Sample = require('./model/sample.js');
const SampleController = require('./controller/SampleController.js');


const Thread = require('./model/thread.js');
const ThreadController = require('./controller/ThreadController.js');


const Trim = require('./model/trim.js');
const TrimController = require('./controller/TrimController.js');

 
 

const app = express();
const PORT = process.env.PORT || 3006;



// Middleware to parse JSON and URL-encoded request bodies with increased payload size limit
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

//routing for Employee
app.get('/employees',EmployeeController.getAllEmployees);
app.post('/employees',EmployeeController.createEmployee);
app.get('/employeelogin',EmployeeController.login);

//routing for the Requests
app.get('/requests',RequestController.getAllRequests);
app.post('/requests',RequestController.createRequest);


//routing for buyers
app.get('/buyers',BuyerController.getAllBuyers);
app.post('/buyers',BuyerController.createBuyer);


//routing for sampletype
app.get('/sampleTypes',SampleTypeController.getAllSampleTypes);
app.post('/sampleTypes',SampleTypeController.createSampleType);


//routing for divisions
app.get('/divisions',DivisionController.getAllDivisions);
app.post('/divisions',DivisionController.createDivision);


//routing for sample
app.get('/samples',SampleController.getAllSamples);
app.post('/samples',SampleController.createSample);
app.get('/uniquesamples',SampleController.getUniqueStyles);
app.get('/samplestogivenstyle',SampleController.getAllSamplesForStyle);
app.get('/samplesbyrequestno',SampleController.getAllSamplesForRequestNo);
app.get('/samplebysampleId',SampleController.getSampleForSampleNoNew);


//routing for threads
app.get('/threads',ThreadController.getAllThreads);
app.post('/threads',ThreadController.createThread);
app.get('/threadsbysampleid',ThreadController.getThreadsBySampleId);


//routing for trims
app.get('/trims',TrimController.getAllTrims);
app.post('/trims',TrimController.createTrim);
app.get('/trimsbysampleid',TrimController.getTrimsBySampleId);



// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});

module.exports = app;