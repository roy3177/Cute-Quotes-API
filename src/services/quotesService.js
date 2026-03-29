/**
 *@file quotesService.js
 *@author Roy Meoded
 * 
 * This file implements the service layer for managing quotes in the Cute Quotes API. It provides functions to:
 * - Load quotes from a JSON file
 * - Save quotes to a JSON file
 * - Get all quotes
 * - Get a quote by ID
 * - Create a new quote
 * - Update an existing quote
 * - Delete a quote by ID
 * The service functions interact with the file system to persist quote data in a JSON file. Each quote has an ID, text, and author. The service ensures that quotes are properly loaded and saved whenever changes are made.
 */

// Import necessary modules:
const fs = require('fs');
const path = require('path');

// Define the path to the quotes JSON file:
const quotesFilePath = path.join(__dirname, '../../quotes.json');

// Function to load quotes from the JSON file:
function loadQuotes() {
  try {
    const data = fs.readFileSync(quotesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Function to save quotes to the JSON file:
function saveQuotes(quotes) {
  fs.writeFileSync(quotesFilePath, JSON.stringify(quotes, null, 2), 'utf8');
}

// Service functions for managing quotes:
function getAllQuotes() {
  return loadQuotes();
}

// Function to get a quote by ID:
function getQuoteById(id) {
  const quotes = loadQuotes();
  return quotes.find(q => q.id === id);
}

// Function to create a new quote:
function createQuote(text, author) {
  const quotes = loadQuotes();
  const maxId = quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) : 0;

  const newQuote = {
    id: maxId + 1,
    text,
    author
  };

  quotes.push(newQuote);
  saveQuotes(quotes);

  return newQuote;
}

// Function to update an existing quote:
function updateQuote(id, text, author) {
  const quotes = loadQuotes();
  const quoteIndex = quotes.findIndex(q => q.id === id);

  if (quoteIndex === -1) {
    return null;
  }

  quotes[quoteIndex] = {
    id,
    text,
    author
  };

  saveQuotes(quotes);
  return quotes[quoteIndex];
}

// Function to delete a quote by ID:
function deleteQuote(id) {
  const quotes = loadQuotes();
  const quoteIndex = quotes.findIndex(q => q.id === id);

  if (quoteIndex === -1) {
    return null;
  }

  const deletedQuote = quotes[quoteIndex];
  quotes.splice(quoteIndex, 1);
  saveQuotes(quotes);

  return deletedQuote;
}


// Export the service functions:
module.exports = {
  getAllQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote
};