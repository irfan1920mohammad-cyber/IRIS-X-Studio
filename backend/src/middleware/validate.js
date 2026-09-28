// Input Validation Middleware
// Validates prompt creation and updates

const validatePromptInput = (req, res, next) => {
  const { title, category, description, promptContent } = req.body;
  
  const errors = [];
  if (!title || typeof title !== 'string' || !title.trim()) {
    errors.push('title is required and must be a non-empty string');
  }
  if (!category || typeof category !== 'string' || !category.trim()) {
    errors.push('category is required (Websites, Animation, 3D, UI/UX, Video)');
  }
  if (!description || typeof description !== 'string' || !description.trim()) {
    errors.push('description is required');
  }
  if (!promptContent || typeof promptContent !== 'string' || !promptContent.trim()) {
    errors.push('promptContent is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      error: 'Validation Failed',
      details: errors
    });
  }

  next();
};

module.exports = {
  validatePromptInput
};
