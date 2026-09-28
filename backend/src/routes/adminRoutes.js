const express = require('express');
const router = express.Router();
const {
  getAllPromptsAdmin,
  createPromptAdmin,
  updatePromptAdmin,
  deletePromptAdmin,
  togglePublishPrompt,
  toggleFeaturePrompt
} = require('../controllers/adminController');
const { validatePromptInput } = require('../middleware/validate');

// Admin CRUD Routes (Owned by Irfan Mohammad for Parmar Shubham)
router.get('/', getAllPromptsAdmin);
router.post('/', validatePromptInput, createPromptAdmin);
router.put('/:id', updatePromptAdmin);
router.delete('/:id', deletePromptAdmin);
router.patch('/:id/publish', togglePublishPrompt);
router.patch('/:id/feature', toggleFeaturePrompt);

module.exports = router;
