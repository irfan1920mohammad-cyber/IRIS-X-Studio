let mockPrompts = require('../data/mockPrompts');

// GET /api/admin/prompts
const getAllPromptsAdmin = (req, res) => {
  res.status(200).json({
    success: true,
    total: mockPrompts.length,
    data: mockPrompts
  });
};

// POST /api/admin/prompts
const createPromptAdmin = (req, res) => {
  const {
    title,
    category,
    subcategory,
    description,
    promptContent,
    previewImageUrl,
    tags,
    isPremium,
    price,
    author
  } = req.body;

  const id = 'pr_' + Date.now();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const newPrompt = {
    id: id,
    title: title,
    slug: slug,
    category: category,
    subcategory: subcategory || 'General',
    description: description,
    promptContent: promptContent,
    previewImageUrl: previewImageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    tags: Array.isArray(tags) ? tags : [],
    isPremium: Boolean(isPremium),
    price: isPremium ? (Number(price) || 9.99) : 0,
    author: author || 'Admin',
    downloadsCount: 0,
    viewsCount: 0,
    isFeatured: false,
    isPublished: true,
    createdAt: new Date().toISOString()
  };

  mockPrompts.unshift(newPrompt);

  res.status(201).json({
    success: true,
    message: 'Prompt created successfully',
    data: newPrompt
  });
};

// PUT /api/admin/prompts/:id
const updatePromptAdmin = (req, res) => {
  const { id } = req.params;
  const index = mockPrompts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      error: 'Prompt ' + id + ' not found'
    });
  }

  const existing = mockPrompts[index];
  const updated = {
    ...existing,
    ...req.body,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString()
  };

  mockPrompts[index] = updated;

  res.status(200).json({
    success: true,
    message: 'Prompt updated successfully',
    data: updated
  });
};

// DELETE /api/admin/prompts/:id
const deletePromptAdmin = (req, res) => {
  const { id } = req.params;
  const initialLen = mockPrompts.length;
  mockPrompts = mockPrompts.filter(p => p.id !== id);

  if (mockPrompts.length === initialLen) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      error: 'Prompt ' + id + ' not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Prompt ' + id + ' deleted successfully'
  });
};

// PATCH /api/admin/prompts/:id/publish
const togglePublishPrompt = (req, res) => {
  const { id } = req.params;
  const prompt = mockPrompts.find(p => p.id === id);

  if (!prompt) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      error: 'Prompt ' + id + ' not found'
    });
  }

  prompt.isPublished = !prompt.isPublished;
  prompt.updatedAt = new Date().toISOString();

  res.status(200).json({
    success: true,
    message: 'Prompt is now ' + (prompt.isPublished ? 'Published' : 'Unpublished'),
    data: prompt
  });
};

// PATCH /api/admin/prompts/:id/feature
const toggleFeaturePrompt = (req, res) => {
  const { id } = req.params;
  const prompt = mockPrompts.find(p => p.id === id);

  if (!prompt) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      error: 'Prompt ' + id + ' not found'
    });
  }

  prompt.isFeatured = !prompt.isFeatured;
  prompt.updatedAt = new Date().toISOString();

  res.status(200).json({
    success: true,
    message: 'Prompt is now ' + (prompt.isFeatured ? 'Featured' : 'Unfeatured'),
    data: prompt
  });
};

module.exports = {
  getAllPromptsAdmin,
  createPromptAdmin,
  updatePromptAdmin,
  deletePromptAdmin,
  togglePublishPrompt,
  toggleFeaturePrompt
};
