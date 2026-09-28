const express = require('express');
const router = express.Router();
const {
  listPrompts,
  getFeaturedPrompts,
  getCategories,
  getPromptById,
  getPromptPreview
} = require('../controllers/promptController');

// Public Prompt Discovery Routes (Owned by Irfan Mohammad for Gauresh & Harshad)
router.get('/', listPrompts);
router.get('/featured', getFeaturedPrompts);
router.get('/categories', getCategories);
router.get('/:id', getPromptById);
router.get('/:id/preview', getPromptPreview);

module.exports = router;
