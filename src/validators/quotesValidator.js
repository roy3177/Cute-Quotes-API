/**
 * @file quotesValidator.js
 * @author Roy Meoded
 * 
 * This file defines validation rules for quote data using express-validator. It includes:
 * - Validation rules for quote text and author fields
 * - A middleware function to handle validation errors and return appropriate responses
 * 
 * The validation rules ensure that the quote text is a non-empty string with a minimum length of 3 characters, and the author is a non-empty string with a minimum length of 2 characters. If validation fails, the handleValidationErrors middleware will return a 400 Bad Request response with details about the validation errors.
 */

// Import necessary functions from express-validator:
const { body, validationResult } = require('express-validator');

// Define validation rules for quote creation and updating:
const quoteValidationRules = [
  body('text')
    .isString().withMessage('text must be a string')
    .trim()
    .notEmpty().withMessage('text is required')
    .isLength({ min: 3 }).withMessage('text must be at least 3 characters long'),

  body('author')
    .isString().withMessage('author must be a string')
    .trim()
    .notEmpty().withMessage('author is required')
    .isLength({ min: 2 }).withMessage('author must be at least 2 characters long')
];

// Middleware to handle validation errors:
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  next();
}

// Export the validation rules and error handling middleware:
module.exports = {
  quoteValidationRules,
  handleValidationErrors
};