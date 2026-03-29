/**
 * @file server.js
 * @author Roy Meoded
 * This file sets up the Express server for the Cute Quotes API. It includes:
 * - Express server configuration
 * - Swagger UI setup for API documentation
 * - Routing for quotes endpoints
 * 
 * The server listens on port 3000 and provides a welcome message at the root endpoint.
 * The API documentation can be accessed at http://localhost:3000/api-docs.
 
 */


// Import necessary modules:
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Create an instance of the Express application:
const app = express();
app.use(express.json());

// Load the Swagger document and set up routes:
const swaggerDocument = YAML.load('./openapi.yaml');
const quotesRoutes = require('./src/routes/quotesRoutes');

// Set up Swagger UI for API documentation:
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set up routes for quotes endpoints:
app.use('/quotes', quotesRoutes);

// Root endpoint to confirm the API is running:
app.get('/', (req, res) => {
  res.send('Cute Quotes API is running!');
});


// Start the server and listen on port 3000:
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Swagger docs on http://localhost:3000/api-docs');
});