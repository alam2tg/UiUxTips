const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json')
  .then((data) => {
    // Parse the JSON data
    const diagnosticsData = JSON.parse(data);
    // Send the diagnostics data as a response
    res.json(diagnosticsData);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  console.info(`${req.method} request received to submit feedback`); 
  const { error } = req.body;
  if (error) {
    // Create a new diagnostic object
    const newDiagnostic = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      error: error
    };
    // Append the new diagnostic object to the db/diagnostics.json file
    readAndAppend('./db/diagnostics.json', newDiagnostic)
      .then(() => {
        // Send a success response
        res.status(201).json({ message: 'Error logged successfully' });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Server Error');
      });
  } else {
    res.status(400).send('Error message must be provided');
  }
});

module.exports = diagnostics;