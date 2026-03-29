/**
 * 
 * @file quotesController.js
 * @author Roy Meoded
 * 
 * This file implements the controller layer for managing quotes in the Cute Quotes API. It provides functions to:
 * - Get all quotes
 * - Get a quote by ID
 * - Create a new quote
 * - Update an existing quote
 * - Delete a quote by ID
 * The controller functions interact with the service layer to perform the necessary operations on the quote data. Each function handles the incoming HTTP request, calls the appropriate service function, and sends back an HTTP response with the result. The controller also handles cases where a quote is not found and returns appropriate error responses.
 * 
 */

// Import necessary functions from the quotes service:
const {
  getAllQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote
} = require('../services/quotesService');

// Controller functions for handling HTTP requests related to quotes:
function getQuotes(req, res) {
  const quotes = getAllQuotes();
  res.json(quotes);
}

// Function to get a quote by ID:
function getQuote(req, res) {
  const id = Number(req.params.id);
  const quote = getQuoteById(id);

  if (!quote) {
    return res.status(404).json({ message: 'Quote not found' });
  }

  res.json(quote);
}

// Function to create a new quote:
function createNewQuote(req, res) {
  const { text, author } = req.body;
  const newQuote = createQuote(text, author);
  res.status(201).json(newQuote);
}

// Function to update an existing quote:
function updateExistingQuote(req, res) {
  const id = Number(req.params.id);
  const { text, author } = req.body;

  const updatedQuote = updateQuote(id, text, author);

  if (!updatedQuote) {
    return res.status(404).json({ message: 'Quote not found' });
  }

  res.json({
    message: 'Quote updated successfully',
    updatedQuote
  });
}

// Function to delete an existing quote:
function deleteExistingQuote(req, res) {
  const id = Number(req.params.id);
  const deletedQuote = deleteQuote(id);

  if (!deletedQuote) {
    return res.status(404).json({ message: 'Quote not found' });
  }

  res.json({
    message: 'Quote deleted successfully',
    deletedQuote
  });
}

// Export the controller functions:
module.exports = {
  getQuotes,
  getQuote,
  createNewQuote,
  updateExistingQuote,
  deleteExistingQuote
};