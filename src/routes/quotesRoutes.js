const express = require('express');
const router = express.Router();

const {
  getQuotes,
  getQuote,
  createNewQuote,
  updateExistingQuote,
  deleteExistingQuote
} = require('../controllers/quotesController');

const {
  quoteValidationRules,
  handleValidationErrors
} = require('../validators/quotesValidator');

router.get('/', getQuotes);
router.get('/:id', getQuote);
router.post('/', quoteValidationRules, handleValidationErrors, createNewQuote);
router.put('/:id', quoteValidationRules, handleValidationErrors, updateExistingQuote);
router.delete('/:id', deleteExistingQuote);

module.exports = router;